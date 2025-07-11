import { Dimensions, StyleProp, TextStyle } from 'react-native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import Config from 'react-native-config';
import { PALETTE } from './palette';
import { Query } from 'react-native-google-places-autocomplete';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

export const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } =
  Dimensions.get('window');
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

export const CUSTOM_DARK_MAP_STYLE = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

export const GOOGLE_PLACES_AUTOCOMPLETE_QUERY_OPTIONS: Query = {
  key: Config.GOOGLE_PLACES_API_KEY as string, // this is a placeholder, api key will be fetched on log in and set in AuthContext
  language: 'en',
  // components: 'country:tw'
};

export const GOOGLE_PLACES_AUTOCOMPLETE_DETAILS_QUERY = {
  fields: 'place_id,name,formatted_address,opening_hours,geometry',
};

export const GOOGLE_PLACES_AUTOCOMPLETE_PLACEHOLDER = 'Search for place';

export const GOOGLE_PLACES_AUTOCOMPLETE_DEBOUNCE_RATE = 500;

export const GOOGLE_PLACES_AUTOCOMPLETE_TEXT_INPUT_PROPS = {
  returnKeyType: 'search',
  // currentLocation
  // renderRow={() => {}}
};

export const HEADER_SHOWN_FALSE = { headerShown: false };

export const SCREEN_OPTIONS: StackNavigationOptions = { headerShown: false };

// TODO: change to relative path
export const PLACEHOLDER_IMAGE_URI: string =
  '/Users/limxuanhui/bluextech/gypsie/assets/images/sun.png';

export const MEDIA_THUMBNAIL_MAX_WIDTH: number = 200;

export const TOAST_TITLE_STYLE: StyleProp<TextStyle> = {
  fontFamily: 'Futura',
  fontWeight: 'normal',
  fontSize: 16,
  color: PALETTE.DARKGREY,
};

export const TOAST_CONFIG: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: PALETTE.GREEN }}
      text1Style={TOAST_TITLE_STYLE}
      // contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  ),

  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text1Style={TOAST_TITLE_STYLE}
      text1NumberOfLines={2}
      // contentContainerStyle={{ paddingVertical: 16 }}
      // style={{ paddingVertical: 16 }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  // tomatoToast: ({ text1, props }) => (
  //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
  //     <Text>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // )
};
