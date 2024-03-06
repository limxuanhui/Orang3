import { Dimensions } from "react-native";
import type { StackNavigationOptions } from "@react-navigation/stack";
import { GOOGLE_MAPS_API_KEY } from "@env";

export const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } =
  Dimensions.get("window");
export const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
export const FULL_SCREEN = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH,
};

export const MAX_TRANSLATE_Y = -DEVICE_HEIGHT;
export const MAP_SCREEN_BOTTOM_SHEET_CONSTANTS = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH * 0.95,
  maxTranslateY: -DEVICE_HEIGHT / 2,
};

export const LATITUDE_DELTA = 0.02;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const INITIAL_POSITION = {
  latitude: 1.352451,
  longitude: 103.9446732,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
export const INITIAL_POSITION_COORD = {
  latitude: 1.352451,
  longitude: 103.9446732,
};

export const COLOR_PALETTE = {
  PRIMARY_PINK: "#f019ff",
};

export const GOOGLE_PLACES_AUTOCOMPLETE_QUERY_OPTIONS = {
  key: GOOGLE_MAPS_API_KEY,
  language: "en",
};

export const GOOGLE_PLACES_AUTOCOMPLETE_DETAILS_QUERY = {
  fields: "place_id,name,formatted_address,opening_hours,geometry",
};

export const GOOGLE_PLACES_AUTOCOMPLETE_PLACEHOLDER = "Search for place";

export const GOOGLE_PLACES_AUTOCOMPLETE_DEBOUNCE_RATE = 500;

export const GOOGLE_PLACES_AUTOCOMPLETE_TEXT_INPUT_PROPS = {
  returnKeyType: "search",
  // currentLocation
  // renderRow={() => {}}
};

export const HEADER_SHOWN_FALSE = { headerShown: false };

export const SCREEN_OPTIONS: StackNavigationOptions = { headerShown: false };

export const PLACEHOLDER_IMAGE_URI: string =
  "/Users/limxuanhui/bluextech/gypsie/assets/images/sun_design3.png";
