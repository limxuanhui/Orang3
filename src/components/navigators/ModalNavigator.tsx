import { useCallback, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import AvatarScreen from "../screens/profile/AvatarScreen";
import FeedScreen from "../screens/feed/FeedScreen";
import ItineraryViewScreen from "../screens/itinerary/ItineraryViewScreen";
import PlaceSearchScreen from "../screens/itinerary/PlaceSearchScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import type { ModalNavigatorParamList } from "./types/types";
import { PALETTE } from "../../utils/constants/palette";
import NewFeedPostScreen from "../screens/post/NewFeedPostScreen";
import ItineraryPostEditScreen from "../screens/post/ItineraryPostEditScreen";
import OptionsIcon from "../common/icons/OptionsIcon";
import GypsieButton from "../common/buttons/GypsieButton";
import ItineraryPostViewScreen from "../screens/post/ItineraryPostViewScreen";

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

  const onPressOptions = useCallback(() => {
    console.log("Open share options");
  }, []);

  useEffect(() => {
    console.log("ModalNavigator mounted");
    return () => {
      console.log("ModalNavigator unmounted");
    };
  }, []);

  return (
    <Modal.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: PALETTE.TRANSPARENT },
        // animationEnabled: false,
      }}>
      <Modal.Screen
        name="NewFeedPost"
        component={NewFeedPostScreen}
        options={{
          ...options,
          // headerTransparent: false,
        }}
      />
      <Modal.Screen
        name="ItineraryPostEdit"
        component={ItineraryPostEditScreen}
        options={{
          ...options,
          // headerTransparent: false,
          headerTintColor: PALETTE.GREY,
          headerRight: () => (
            <GypsieButton
              customButtonStyles={{
                backgroundColor: "transparent",
                width: "auto",
                right: 16,
              }}
              customIconStyles={{ fontSize: 24, color: PALETTE.GREY }}
              Icon={OptionsIcon}
              onPress={onPressOptions}
            />
          ),
        }}
      />
      <Modal.Screen
        name="ItineraryPostView"
        component={ItineraryPostViewScreen}
        options={{
          ...options,
          // headerTransparent: false,
          headerTintColor: PALETTE.GREY,
          headerRight: () => (
            <GypsieButton
              customButtonStyles={{
                backgroundColor: "transparent",
                width: "auto",
                right: 16,
              }}
              customIconStyles={{ fontSize: 24, color: PALETTE.GREY }}
              Icon={OptionsIcon}
              onPress={onPressOptions}
            />
          ),
        }}
      />
      <Modal.Screen
        name="Avatar"
        component={AvatarScreen}
        options={{
          ...options,
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
        }}
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
