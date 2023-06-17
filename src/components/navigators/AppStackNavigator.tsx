import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { AppStackNavigatorParamList } from "../../utils/types/navigation";

import BottomTabNavigator from "./BottomTabNavigator";
import ItineraryPlanningScreen from "../screens/itinerary/ItineraryPlanningScreen";
import ItineraryViewScreen from "../screens/itinerary/ItineraryViewScreen";
import PlaceSearchScreen from "../screens/itinerary/PlaceSearchScreen";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../screens/feed/FeedScreen";
import SplashScreen from "../screens/SplashScreen";

const AppStack = createStackNavigator<AppStackNavigatorParamList>();

const AppStackNavigator = () => {
  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const config = {
    stiffness: 800,
    damping: 50,
    mass: 1,
    overshootClamping: true,
    velocity: { x: 100, y: 150 },

    // tension:30
    // speed:40
    // restDisplacementThreshold: 0.01,
    // restSpeedThreshold: 0.01,
  };

  return (
    <AppStack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Splash" component={SplashScreen} />

      <AppStack.Screen name="bottom-tab" component={BottomTabNavigator} />
      {/* <AppStack.Screen
          name="comments"
          component={CommentScreen}
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
          }}
        /> */}
      <AppStack.Screen
        name="feed"
        component={FeedScreen}
        options={{
          gestureDirection: "vertical",
          // headerShown:true,
          transitionSpec: {
            open: { animation: "spring", config },
            close: {
              animation: "spring",
              config,
            },
          },
          cardStyleInterpolator: ({
            current,
            next,
            index,
            closing,
            layouts,
          }) => ({
            containerStyle: {},
            cardStyle: {
              transform: [{ scale: current.progress }],
            },
            overlayStyle: {},
            shadowStyle: {},
          }),
        }}
      />
      <AppStack.Screen
        name="itinerary-planning"
        component={ItineraryPlanningScreen}
        options={{
          transitionSpec: {
            open: { animation: "spring", config },
            close: {
              animation: "spring",
              config,
            },
          },
          cardStyleInterpolator: ({
            current,
            next,
            index,
            closing,
            layouts,
          }) => ({
            containerStyle: {},
            cardStyle: {
              transform: [{ scale: current.progress }],
            },
            overlayStyle: {},
            shadowStyle: {},
          }),
        }}
      />
      <AppStack.Screen name="itinerary-view" component={ItineraryViewScreen} />
      <AppStack.Screen name="place-search" component={PlaceSearchScreen} />
      {/* <MapStack.Screen
        name="feed"
        component={FeedScreen}
        options={{
          headerShown: true,
          title: "Explore",
          headerStyle: { backgroundColor: PALETTE.BLACK },
          headerTitleStyle: { color: PALETTE.WHITE, fontWeight: "bold" },
        }}
      /> */}
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
