import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  Itinerary,
  ItineraryPlannerMode,
  RouteInfo,
  RouteNodeCoord,
  RouteNodeInfo,
} from "../../../components/itinerary/types/types";
import { BACKEND_BASE_URL } from "@env";
import Polyline from "@mapbox/polyline";

type ItineraryPlanner = {
  mode: ItineraryPlannerMode;
  selectedRouteId: string;
  modalInitialValue: string;
  modalIsOpen: boolean;
  itinerary: Itinerary;
};
type ItineraryState = Readonly<ItineraryPlanner>;

const initialState: ItineraryState = {
  mode: "view",
  selectedRouteId: "",
  modalInitialValue: "",
  modalIsOpen: false,
  itinerary: {
    id: "",
    creatorId: "",
    routes: [
      {
        id: nanoid(),
        name: "Day 1",
        routeNodes: [],
        isRouted: false,
        encodedPolyline: "",
      },
    ],
  },
};

export const itineraryPlanner_startRouting = createAsyncThunk(
  "itineraryPlanner/startRouting",
  async (selectedRoute: RouteInfo, thunkAPI) => {
    console.log("Data prepared. Beginning to hit api");
    const url = BACKEND_BASE_URL + "/api/directions";
    const data = selectedRoute.routeNodes.map(
      (routeNode: RouteNodeInfo) => routeNode.coord,
    );
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const directionsResponse = await response.json();

      let orderedRouteNodes: RouteNodeInfo[] = [];
      directionsResponse.order.forEach((id: number) => {
        const currentNode = selectedRoute.routeNodes[id];
        if (currentNode) {
          orderedRouteNodes.push(currentNode);
        }
      });

      let polyline: RouteNodeCoord[] = [];
      console.log("\n======Results======");
      console.log(
        JSON.stringify(directionsResponse.directionsResultList, null, 4),
      );
      console.log("\n");
      // Backend will return an array of polylines, 
      // where each polyline defines the route between two places
      directionsResponse.directionsResultList.forEach(
        (direction: {
          routes: { overviewPolyline: { encodedPath: string } }[];
        }) => {
          const directionCoords = Polyline.decode(
            direction.routes[0].overviewPolyline.encodedPath,
          ).map((coord: any[]) => ({
            latitude: coord[0],
            longitude: coord[1],
          }));
          polyline = polyline.concat(directionCoords);
        },
      );

      return {
        ...selectedRoute,
        routeNodes: orderedRouteNodes,
        isRouted: true,
        polyline,
      };
    } catch (err: unknown) {
      console.error(err);
    }
  },
);

const itineraryPlannerSlice = createSlice({
  name: "itineraryPlanner",
  initialState,
  reducers: {
    itineraryPlanner_setMode: (state, action) => {
      state.mode = action.payload.mode;
    },
    itineraryPlanner_setSelectedRouteId: state => {
      console.log("running setSelectedRiute id: ", state.itinerary);
      state.selectedRouteId = state.itinerary.routes[0].id;
    },
    itineraryPlanner_createItinerary: (state, action) => {
      state.itinerary = {
        id: uuidv4(),
        creatorId: action.payload.creatorId,
        routes: [
          {
            id: uuidv4(),
            name: "Day 1",
            routeNodes: [],
            isRouted: false,
            encodedPolyline: "",
          },
        ],
      };
    },
    itineraryPlanner_setItinerary: (state, action) => {
      console.log("itineraryPlanner_setItinerary called");
      state.itinerary.id = action.payload.itinerary.id;
      state.itinerary.creatorId = action.payload.itinerary.creatorId;
      state.itinerary.routes = action.payload.itinerary.routes;
    },

    itineraryPlanner_addRoute: (state, action) => {
      const newId = nanoid();
      const newRoute: RouteInfo = {
        id: newId,
        name: action.payload.name,
        routeNodes: [],
        isRouted: false,
        encodedPolyline: "",
      };
      state.itinerary.routes.push(newRoute);
      state.modalIsOpen = false;
      state.selectedRouteId = newId;
    },
    itineraryPlanner_clearRoute: state => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return { ...route, routeNodes: [], polyline: [] };
        }
        return route;
      });
    },
    itineraryPlanner_deleteRoute: state => {
      if (state.itinerary.routes.length > 1) {
        const filteredRoutes = state.itinerary.routes.filter(
          route => route.id !== state.selectedRouteId,
        );
        state.itinerary.routes = filteredRoutes;
        state.selectedRouteId = filteredRoutes[0].id;
      }
    },
    itineraryPlanner_holdRoute: (state, action) => {
      state.modalInitialValue = action.payload.modalInitialValue;
    },
    itineraryPlanner_selectRoute: (state, action) => {
      state.selectedRouteId = action.payload.selectedRouteId;
    },
    itineraryPlanner_setRoute: (state, action) => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return action.payload.route;
        }
        return route;
      });
    },
    itineraryPlanner_updateRouteName: (state, action) => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return { ...route, name: action.payload.name };
        }
        return route;
      });
      state.modalIsOpen = false;
    },

    itineraryPlanner_addPlace: (state, action) => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return {
            ...route,
            routeNodes: [...route.routeNodes, action.payload.routeNode],
            isRouted: false,
          };
        }
        return route;
      });
    },
    itineraryPlanner_deletePlace: (state, action) => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return {
            ...route,
            routeNodes: route.routeNodes.filter(
              (routeNode: RouteNodeInfo) =>
                routeNode.placeId !== action.payload.placeId,
            ),
            isRouted: false,
            polyline: [],
          };
        }
        return route;
      });
    },

    itineraryPlanner_closeModal: state => {
      state.modalIsOpen = false;
    },
    itineraryPlanner_openModal: state => {
      state.modalIsOpen = true;
    },
    itineraryPlanner_resetItineraryPlannerSlice: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(itineraryPlanner_startRouting.pending, (state, action) => {})
      .addCase(itineraryPlanner_startRouting.fulfilled, (state, action) => {})
      .addCase(itineraryPlanner_startRouting.rejected, (state, action) => {});
  },
});

export const {
  itineraryPlanner_createItinerary,
  itineraryPlanner_setMode,
  itineraryPlanner_setItinerary,

  itineraryPlanner_setSelectedRouteId,
  itineraryPlanner_addRoute,
  itineraryPlanner_clearRoute,
  itineraryPlanner_deleteRoute,
  itineraryPlanner_holdRoute,
  itineraryPlanner_selectRoute,
  itineraryPlanner_setRoute,
  itineraryPlanner_updateRouteName,

  itineraryPlanner_addPlace,
  itineraryPlanner_deletePlace,

  itineraryPlanner_closeModal,
  itineraryPlanner_openModal,
  itineraryPlanner_resetItineraryPlannerSlice,
} = itineraryPlannerSlice.actions;
export default itineraryPlannerSlice.reducer;
