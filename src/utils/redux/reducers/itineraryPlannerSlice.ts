import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { decode, encode } from '@googlemaps/polyline-codec';
import { ulid } from 'ulid';
import {
  Itinerary,
  Route,
  RouteNodeCoord,
  RouteNode,
  ItineraryPlannerMode,
} from '@components/itinerary/types/types';
import { ITINERARY_ROUTING_URL } from '@constants/urls';
import { axiosClient } from '@helpers/singletons';

type ItineraryPlanner = {
  mode: ItineraryPlannerMode;
  selectedRouteId: string;
  selectedRouteNodeId: string;
  modalInitialValue: string;
  modalIsOpen: boolean;
  modalType: 'ROUTE_NAME' | 'COLOUR_PICKER';
  itinerary: Itinerary;
};
type ItineraryState = Readonly<ItineraryPlanner>;

const initialState: ItineraryState = {
  mode: 'VIEW',
  selectedRouteId: '',
  selectedRouteNodeId: '',
  modalInitialValue: '',
  modalIsOpen: false,
  modalType: 'ROUTE_NAME',
  itinerary: {
    metadata: {
      id: '',
      creator: {
        id: '',
        name: '',
        handle: '',
        email: '',
        avatar: undefined,
      },
    },
    routes: [
      {
        id: '',
        name: 'Day 1',
        routeNodes: [],
        polyline: [],
        encodedPolyline: '',
        order: 0,
      },
    ],
  },
};

export const itineraryPlanner_startRouting = createAsyncThunk(
  'itineraryPlanner/startRouting',
  async (selectedRoute: Route, _thunkAPI) => {
    console.log('Data prepared. Beginning to hit api');
    const data = selectedRoute.routeNodes.map(
      (routeNode: RouteNode) => routeNode.coord,
    );
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const directionsResponse = await axiosClient.post(
        ITINERARY_ROUTING_URL,
        JSON.stringify(data),
        options,
      );

      let orderedRouteNodes: RouteNode[] = [];
      directionsResponse.data.order.forEach((id: number) => {
        const currentNode = selectedRoute.routeNodes[id];
        if (currentNode) {
          orderedRouteNodes.push(currentNode);
        }
      });
      console.log(directionsResponse.data.order);
      orderedRouteNodes = orderedRouteNodes.map((routeNode, index) => ({
        ...routeNode,
        order: index + 1,
      }));

      let polyline: RouteNodeCoord[] = [];
      console.log('\n======Results======');
      console.log(
        JSON.stringify(directionsResponse.data.directionsResultList, null, 4),
      );
      console.log('\n');
      // Backend will return an array of polylines,
      // where each polyline defines the route between two places
      directionsResponse.data.directionsResultList.forEach(
        (direction: {
          routes: { overviewPolyline: { encodedPath: string } }[];
        }) => {
          // const directionCoords = Polyline.decode(
          const directionCoords = decode(
            direction.routes[0].overviewPolyline.encodedPath,
          ).map((coord: any[]) => ({
            latitude: coord[0],
            longitude: coord[1],
          }));
          // polylines.push(directionCoords) --> multiple polylines, each representing the route between 2 places
          polyline = polyline.concat(directionCoords);
        },
      );

      const encodedPolyline = encode(
        polyline.map(coord => [coord.latitude, coord.longitude]),
      );

      return {
        ...selectedRoute,
        routeNodes: orderedRouteNodes,
        polyline,
        encodedPolyline,
      };
    } catch (err: unknown) {
      console.error(err);
    }
  },
);

const itineraryPlannerSlice = createSlice({
  name: 'itineraryPlanner',
  initialState,
  reducers: {
    itineraryPlanner_initItinerary: (state, action) => {
      state.itinerary = action.payload.itinerary;
      if (state.itinerary.routes.length === 0) {
        state.itinerary.routes.push({
          id: '',
          name: 'Day 1',
          routeNodes: [],
          polyline: [],
          encodedPolyline: '',
          order: 0,
        });
      }
      state.selectedRouteId = state.itinerary.routes[0].id;
    },
    itineraryPlanner_createItinerary: (state, action) => {
      const initialRouteId = ulid();
      state.itinerary = {
        metadata: {
          id: ulid(),
          creator: action.payload.creator,
        },
        routes: [
          {
            id: initialRouteId,
            name: 'Day 1',
            routeNodes: [],
            encodedPolyline: '',
            polyline: [],
            order: 0,
          },
        ],
      };
      state.selectedRouteId = initialRouteId;
    },
    itineraryPlanner_setMode: (state, action) => {
      state.mode = action.payload.mode;
    },
    itineraryPlanner_reorderRoutes: state => {
      state.itinerary.routes = state.itinerary.routes.map(
        (route: Route, index: number) => ({
          ...route,
          order: index,
        }),
      );
    },
    itineraryPlanner_addRoute: (state, action) => {
      const newId = nanoid();
      const newRoute: Route = {
        id: newId,
        name: action.payload.name,
        routeNodes: [],
        polyline: [],
        encodedPolyline: '',
        order: state.itinerary.routes.length,
      };
      state.itinerary.routes.push(newRoute);
      state.modalIsOpen = false;
      state.selectedRouteId = newId;
    },
    itineraryPlanner_clearRoute: state => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return {
            ...route,
            routeNodes: [],
            polyline: [],
            encodedPolyline: '',
          };
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
      state.modalInitialValue = '';
    },

    itineraryPlanner_setSelectedRouteNodeId: (state, action) => {
      state.selectedRouteNodeId = action.payload.selectedRouteNodeId;
    },
    itineraryPlanner_confirmRouteNodeColour: (state, action) => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return {
            ...route,
            routeNodes: route.routeNodes.map(routeNode => {
              if (routeNode.id === action.payload.routeNodeId) {
                routeNode.colour = action.payload.colour;
              }
              return routeNode;
            }),
          };
        }
        return route;
      });
    },

    itineraryPlanner_addPlace: (state, action) => {
      state.itinerary.routes = state.itinerary.routes.map(route => {
        if (route.id === state.selectedRouteId) {
          return {
            ...route,
            routeNodes: [
              ...route.routeNodes.map(routeNode => {
                return { ...routeNode, order: undefined };
              }),
              action.payload.routeNode,
            ],
            encodedPolyline: '',
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
            routeNodes: route.routeNodes
              .filter(
                (routeNode: RouteNode) =>
                  routeNode.id !== action.payload.routeNodeId,
              )
              .map(routeNode => ({ ...routeNode, order: undefined })),
            encodedPolyline: '',
          };
        }
        return route;
      });
    },

    itineraryPlanner_closeModal: state => {
      state.modalIsOpen = false;
      state.modalInitialValue = '';
    },
    itineraryPlanner_openModal: (state, action) => {
      state.modalType = action.payload.modalType;
      state.modalInitialValue = action.payload.modalInitialValue;
      state.modalIsOpen = true;
    },
    itineraryPlanner_resetItineraryPlannerSlice: () => initialState,
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(itineraryPlanner_startRouting.pending, (state, action) => {})
  //     .addCase(itineraryPlanner_startRouting.fulfilled, (state, action) => {})
  //     .addCase(itineraryPlanner_startRouting.rejected, (state, action) => {});
  // },
});

export const {
  itineraryPlanner_initItinerary,
  itineraryPlanner_createItinerary,
  itineraryPlanner_setMode,

  // itineraryPlanner_setSelectedRouteId,
  itineraryPlanner_reorderRoutes,
  itineraryPlanner_addRoute,
  itineraryPlanner_clearRoute,
  itineraryPlanner_deleteRoute,
  itineraryPlanner_selectRoute,
  itineraryPlanner_setRoute,
  itineraryPlanner_updateRouteName,
  itineraryPlanner_setSelectedRouteNodeId,
  itineraryPlanner_confirmRouteNodeColour,

  itineraryPlanner_addPlace,
  itineraryPlanner_deletePlace,

  itineraryPlanner_closeModal,
  itineraryPlanner_openModal,
  itineraryPlanner_resetItineraryPlannerSlice,
} = itineraryPlannerSlice.actions;
export default itineraryPlannerSlice.reducer;
