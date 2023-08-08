import {
  StackCardInterpolationProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import AvatarScreen from "../screens/profile/AvatarScreen";
import FeedScreen from "../screens/feed/FeedScreen";
import ItineraryViewScreen from "../screens/itinerary/ItineraryViewScreen";
import PlaceSearchScreen from "../screens/itinerary/PlaceSearchScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import type { ModalNavigatorParamList } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";
import { useEffect } from "react";
import NewFeedPostScreen from "../screens/post/NewFeedPostScreen";
import { Text } from "react-native";

const Modal = createStackNavigator<ModalNavigatorParamList>();

const ModalNavigator = () => {
  const config = {
    stiffness: 800,
    damping: 50,
    mass: 1,
    overshootClamping: true,
    velocity: { x: 100, y: 150 },
  };

  const options = {
    headerShown: true,
    headerBackTitleVisible: false,
    headerTitle: "",
    headerTransparent: true,
    headerTintColor: PALETTE.OFFWHITE,
    headerShadowVisible: false,
    useNativeDriver: true,
  };

  // const navigationOptions = ({navigation}) => {
  //   return <HeaderBack
  // }

  useEffect(() => {
    console.log("ModalNavigator mounted");
    return () => {
      console.log("ModalNavigator unmounted");
    };
  }, []);

  return (
    <Modal.Navigator
      // initialRouteName="Avatar"
      screenOptions={{
        headerShown: false,
        // animationEnabled: true,
        gestureEnabled: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: PALETTE.TRANSPARENT },
      }}>
      <Modal.Screen
        name="NewFeedPost"
        component={NewFeedPostScreen}
        options={{
          ...options,
          // headerTransparent: false,
          // headerTitle: "New post",
          // headerTintColor: PALETTE.BLACK
        }}
      />
      <Modal.Screen
        name="Avatar"
        component={AvatarScreen}
        options={{
          ...options,
          // gestureEnabled: false,
          // gestureDirection: "vertical",
          // animationEnabled: false,
          // animationTypeForReplace: "pop",
          // transitionSpec: {
          //   open: { animation: "spring", config },
          //   close: { animation: "spring", config },
          // },
          // cardOverlayEnabled: true,
          // cardStyle: { backgroundColor: PALETTE.TRANSPARENT },
          // presentation: "card",
        }}
      />
      <Modal.Screen
        name="Profile"
        component={ProfileScreen}
        options={options}
      />
      <Modal.Screen
        name="ItineraryView"
        component={ItineraryViewScreen}
        options={options}
      />
      <Modal.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          ...options,

          // gestureEnabled:true,
          // gestureDirection: "vertical",
          // transitionSpec: {
          //   open: { animation: "spring", config },
          //   close: {
          //     animation: "spring",
          //     config,
          //   },
          // },
          // cardStyleInterpolator: ({
          //   current,
          //   next,
          //   index,
          //   closing,
          //   layouts,
          // }) => ({
          //   containerStyle: {},
          //   cardStyle: {
          //     transform: [{ scale: current.progress }],
          //   },
          //   overlayStyle: {},
          //   shadowStyle: {},
          // }),
        }}
        // sharedElements={(route, otherRoute, showing) => {
        //   if (otherRoute.name === "ItineraryView" && showing) {
        //     const { feedId } = route.params;
        //     console.warn("reached: " + feedId);
        //     return [`feed-${feedId}`];
        //   }
        // }}
      />
      <Modal.Screen
        name="PlaceSearch"
        component={PlaceSearchScreen}
        options={options}
      />
    </Modal.Navigator>
  );
};

export default ModalNavigator;
