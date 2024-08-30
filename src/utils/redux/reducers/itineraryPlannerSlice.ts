import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { ulid } from 'ulid';
import {
  Itinerary,
  Route,
  RouteNode,
  ItineraryPlannerMode,
} from '@components/itinerary/types/types';

type ItineraryPlanner = {
  mode: ItineraryPlannerMode;
  selectedRouteId: string;
  selectedRouteNodeId: string;
  modalInitialValue: string;
  modalIsOpen: boolean;
  modalType: 'ROUTE_NAME' | 'COLOUR_PICKER';
  itinerary: Itinerary;
  isRouting: boolean;
  error: string;
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
        isDeactivated: false,
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
  isRouting: false,
  error: '',
};

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
      const initialRouteId = nanoid();
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
    itineraryPlanner_setMode: (
      state,
      action: PayloadAction<{ mode: ItineraryPlannerMode }>,
    ) => {
      state.mode = action.payload.mode;
    },
    itineraryPlanner_setIsRouting: (state, action) => {
      state.isRouting = action.payload.isRouting;
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
              // ...route.routeNodes.map((routeNode: RouteNode, index: number) => {
              //   return { ...routeNode, order: index + 1 };
              // }),
              ...route.routeNodes,
              action.payload.routeNode,
            ],
            encodedPolyline: '',
            polyline: [],
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
              .map((routeNode: RouteNode, index: number) => ({
                ...routeNode,
                order: index + 1,
              })),
            encodedPolyline: '',
            polyline: [],
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
});

export const {
  itineraryPlanner_initItinerary,
  itineraryPlanner_createItinerary,
  itineraryPlanner_setMode,
  itineraryPlanner_setIsRouting,
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
