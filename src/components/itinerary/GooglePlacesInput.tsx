import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import type { GooglePlacesInputProps } from "./types/types";
import {
  GOOGLE_PLACES_AUTOCOMPLETE_DEBOUNCE_RATE,
  GOOGLE_PLACES_AUTOCOMPLETE_DETAILS_QUERY,
  GOOGLE_PLACES_AUTOCOMPLETE_PLACEHOLDER,
  GOOGLE_PLACES_AUTOCOMPLETE_QUERY_OPTIONS,
  GOOGLE_PLACES_AUTOCOMPLETE_TEXT_INPUT_PROPS,
} from "../../utils/constants/constants";
import { DIMENSION } from "../../utils/constants/dimensions";
import { PALETTE } from "../../utils/constants/palette";

const GooglePlacesInput = ({ onReceiveResults }: GooglePlacesInputProps) => {
  const data = {
    description: "Tampines Central 5, Tampines Mall, Singapore",
    matched_substrings: [{ length: 13, offset: 20 }],
    place_id: "ChIJ89lf6hE92jERQXt7c5QOFnY",
    reference: "ChIJ89lf6hE92jERQXt7c5QOFnY",
    structured_formatting: {
      main_text: "Tampines Mall",
      main_text_matched_substrings: [[Object]],
      secondary_text: "Tampines Central 5, Singapore",
    },
    terms: [
      { offset: 0, value: "Tampines Central 5" },
      { offset: 20, value: "Tampines Mall" },
      { offset: 35, value: "Singapore" },
    ],
    types: ["shopping_mall", "point_of_interest", "establishment"],
  };
  const details_geometry = {
    location: { lat: 1.352451, lng: 103.9446732 },
    viewport: {
      northeast: { lat: 1.353858430291502, lng: 103.9458239302915 },
      southwest: { lat: 1.351160469708498, lng: 103.9431259697085 },
    },
  };
  const details = {
    address_components: [
      { long_name: "4", short_name: "4", types: [Array] },
      {
        long_name: "Tampines Central 5",
        short_name: "Tampines Central 5",
        types: [Array],
      },
      { long_name: "Tampines", short_name: "Tampines", types: [Array] },
      { long_name: "Singapore", short_name: "Singapore", types: [Array] },
      { long_name: "Singapore", short_name: "SG", types: [Array] },
      { long_name: "529510", short_name: "529510", types: [Array] },
    ],
    adr_address:
      '<span class="street-address">4 Tampines Central 5</span>, <span class="country-name">Singapore</span> <span class="postal-code">529510</span>',
    business_status: "OPERATIONAL",
    formatted_address: "4 Tampines Central 5, Singapore 529510",
    formatted_phone_number: "6788 8370",
    geometry: {
      location: { lat: 1.352451, lng: 103.9446732 },
      viewport: { northeast: [Object], southwest: [Object] },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    international_phone_number: "+65 6788 8370",
    name: "Tampines Mall",
    opening_hours: {
      open_now: false,
      periods: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
      ],
      weekday_text: [
        "Monday: 10:00 AM – 10:00 PM",
        "Tuesday: 10:00 AM – 10:00 PM",
        "Wednesday: 10:00 AM – 10:00 PM",
        "Thursday: 10:00 AM – 10:00 PM",
        "Friday: 10:00 AM – 10:00 PM",
        "Saturday: 10:00 AM – 10:00 PM",
        "Sunday: 10:00 AM – 10:00 PM",
      ],
    },
    photos: [
      {
        height: 3000,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3cociIMEG-l5tMCAF1TG472fJumz37-Ea_ViFLDNn8bNXZkXMJz-DlEjKfHCoFSnaE7dyVtSVbF_B2gkELIIpKqE4ujWfas8bnlb8GpLsMi_0KRsV7O807zWRlCOOqqDKNVOMFcuXY7CKZ5rcjdtdvZEFhf9pRLSJ7vQ7kluPtN8hBQ",
        width: 4000,
      },
      {
        height: 3024,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3fVGAFRryRFzwd0FiASU9Ynvkj3ERwI5Jptl76IomQzKnfNj2STzDlBDp_cStMvib2Q6j5cRAEDWMEjEk8c4dYLR4uGeScxsNxTbw_8MhOe1KI2AAzjfnaD8aNtKCMda9edrRsV0jFzPuHIxg9SSC_imDWSMQkd66y-JlZ5fH6IRCvx",
        width: 4032,
      },
      {
        height: 4032,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3cM-bSSv-_2TPkFcLBtPJ_Ld6yzk4w79CH5_T-Ip7_cm874g4Yvqol44c7g_Rsu_YFFLXQ0dHsasudW_RFiLzkQWCmifc3KYAa6AMBiQzdkUWPnmj-_tnYFmaG3p5JRg0yWiskpBt80OgFfxeokXxnuw5kEL-2yis6AD3cSmupoyjPK",
        width: 3024,
      },
      {
        height: 3000,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3dzewZvl-mKlyVYww_HHxdEG_E5S6XWJkthmUmW2jEDWM3BkISU2rwlZNrOBrm5PUGHLnPLqBVtR5Zdf1JIa_VsatG5h9AJd1q9x4q5QSsuGqMcMwt3ERDEikmnqwmUSBxkxYJZ3VbvxxJGHx5dvNs_tMq5F2aFyTrbYaMqYehE2-J-",
        width: 4000,
      },
      {
        height: 3000,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3ffOh10Xsuhm9F3-OSmjs1FIONNcThH0JeGNE2xWtl_TYn0KCBfY-lvWFWc-nOvwr_yQze37f2O4z381T1hx6RPwMjbEkyKJvZamz9Jvwf6VQHgd-frQZW2y2MwsBImNaAtaacy8sJGYGfUftz6w7cfQ48cDWLC6WSy1aFXdz8uHKJ9",
        width: 4000,
      },
      {
        height: 4000,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3cMMmX1UHpepT7HjdvLt6zLPZ_9zOaV0XU-kj89DT2S02T-YrcTMowKSVGGjumBVV-hAu7ZUNM-lSUWEl9u5j9wZh9lcQZM1wufEJs0SVC8EbCo7DgmCClO8Msmy96-DGQrSxXvDfBF4DvYCIZ_3giqDmZlWu1-jGd3k6xu0gl-yUJ_",
        width: 3000,
      },
      {
        height: 2160,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3dW2Ny_9WNXwIt5CGSS-bCETsuS8Bd1qyL05qHCog1NfmVtFilZTtLPA7qn9Ym674nCJ6hI0T8qINAHSQwxaeqg-zdGZ39PdmqU7MpZKitm5LLnsnI70wQboHZ117K6stF_ozwN5_6ele5UbfyXSWAL9URrInb8XtEHOk0sKfxNI9MX",
        width: 3840,
      },
      {
        height: 4608,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3eJjUQlsAfOxG7-Txa7Pk-R0PPVSk6yN363CYISsaf37mfngspx16Vd01z9Nbe0mOuQaCtM8GyC2909dAuz8T1UIBKxBnrt0X4uAGfFuPeMO4JsWz7c6_82Qc6C9VNA3liWA2C1c80FhSuNBgWU8eeQyTlsE6vt0D1JTh89kJs9brdk",
        width: 3456,
      },
      {
        height: 3024,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3e77fq2RojOVOdlZiqsWO0Fakq6qvDp3lmWACvb_oYFKNA63u302R_-KESFNnfZlbXKPX0iCYuZypGOvmn0GFTf8_6te7G4De15QVDERL1cLtwtQXnAUVItwBxBwefxfjv69GQM_bKvOuAhHo9DhmAjRX3PFeJ9hzrJUY6vCC3-H41W",
        width: 4032,
      },
      {
        height: 3024,
        html_attributions: [Array],
        photo_reference:
          "AeJbb3dvI_IndHVDmhZOBftjvprGHlKUFYtHFmJrYkx1STvH3tVmM7fReLoSUG-Uhfc0VSKnKsM7mK9XtIMYk7JdTIHwPBj-zrnoxy5Lje9RDRlXe7LtS8FPdw0AOA6KG1EEGRlVvB1ghIJmKtOPxOqCZLD2XUWwjotODZpfEjw2DTBHPClL",
        width: 4032,
      },
    ],
    place_id: "ChIJ89lf6hE92jERQXt7c5QOFnY",
    plus_code: {
      compound_code: "9W2V+XV Singapore",
      global_code: "6PH59W2V+XV",
    },
    rating: 4.3,
    reference: "ChIJ89lf6hE92jERQXt7c5QOFnY",
    reviews: [
      {
        author_name: "YH Tan",
        author_url:
          "https://www.google.com/maps/contrib/116509968309248667320/reviews",
        language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a/AItbvmmW0-7b07xrbXwzc51xLLvgVg6uDlRPP1zD9Og8=s128-c0x00000000-cc-rp-mo",
        rating: 3,
        relative_time_description: "a year ago",
        text: "Average neighbourhood mall in the east of Singapore.",
        time: 1600369089,
      },
      {
        author_name: "boon siong ng",
        author_url:
          "https://www.google.com/maps/contrib/113194883971093933379/reviews",
        language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/AFdZucpR5ZwbWBmXI-9zWSnbsdUhGCalKz97oMsxjYlyVA=s128-c0x00000000-cc-rp-mo-ba5",
        rating: 4,
        relative_time_description: "a year ago",
        text: "The best out of 3 malls there,good mix of shops ,but the 180 degrees car park entrance is a problem.",
        time: 1599964660,
      },
      {
        author_name: "Isaac Tan",
        author_url:
          "https://www.google.com/maps/contrib/117855926737607264292/reviews",
        language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/AFdZucqSj4lYKBbs2Ac5KFSGA0oS1gHw9jEmrz_Ajx3_NA=s128-c0x00000000-cc-rp-mo-ba5",
        rating: 5,
        relative_time_description: "4 months ago",
        text: "Capitamall is good at running a mall even in China. Good mix of shops will result in great shopping experience. Tampines Mall is back to normal after 2 years. Its good to see normalcy returned.",
        time: 1651578241,
      },
      {
        author_name: "Sulaiman Hamifah",
        author_url:
          "https://www.google.com/maps/contrib/103498102603297994004/reviews",
        language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a/AItbvmm-WXzXpWOktSlWzV38ooy0NuaHIdx90H5-7Wu4=s128-c0x00000000-cc-rp-mo-ba4",
        rating: 3,
        relative_time_description: "a year ago",
        text: "Crowded even during Covid19 nowadays... hate it but still love going there.",
        time: 1600068251,
      },
      {
        author_name: "MUSIC DREAMZ SCHOOL",
        author_url:
          "https://www.google.com/maps/contrib/105082802522508092663/reviews",
        language: "en",
        profile_photo_url:
          "https://lh3.googleusercontent.com/a-/AFdZucrB1OnOcf15Tf8ks_co0B9YlAE2tuTyDbUODxhe8w=s128-c0x00000000-cc-rp-mo",
        rating: 5,
        relative_time_description: "5 months ago",
        text: "It is so convenient now. You can can wonderful shopping here while children can have wonderful music lessons! And it is only 5 mins away  @ Our Tampines Hub A top choice Music School is so near you now. Music Dreamz School brings to you the popular Fun With Keyboard Course for children. You can book a free trial now and find out more. Check out the website today!",
        time: 1647574056,
      },
    ],
    types: ["shopping_mall", "point_of_interest", "establishment"],
    url: "https://maps.google.com/?cid=8509004576718551873",
    user_ratings_total: 12750,
    utc_offset: 480,
    vicinity: "4 Tampines Central 5",
    website: "http://www.tampinesmall.com.sg/",
  };

  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  const onPressSuggestion = useCallback(
    (data: GooglePlaceData, details: GooglePlaceDetail | null = null) => {
      // 'details' is provided when fetchDetails = true
      console.log("Data:", JSON.stringify(data, null, 4));
      console.log("Details", JSON.stringify(details, null, 4));
      inputRef.current?.setAddressText("");
      onReceiveResults(details);
    },
    [inputRef, onReceiveResults],
  );

  return (
    <GooglePlacesAutocomplete
      ref={inputRef}
      styles={styles}
      placeholder={GOOGLE_PLACES_AUTOCOMPLETE_PLACEHOLDER}
      query={GOOGLE_PLACES_AUTOCOMPLETE_QUERY_OPTIONS}
      debounce={GOOGLE_PLACES_AUTOCOMPLETE_DEBOUNCE_RATE}
      GooglePlacesDetailsQuery={GOOGLE_PLACES_AUTOCOMPLETE_DETAILS_QUERY}
      textInputProps={GOOGLE_PLACES_AUTOCOMPLETE_TEXT_INPUT_PROPS}
      fetchDetails
      keepResultsAfterBlur
      onPress={onPressSuggestion}
    />
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: DIMENSION.HUNDRED_PERCENT,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: PALETTE.LIGHTGREY,
  },
  textInput: {},
  listView: {
    alignSelf: "center",
    width: DIMENSION.HUNDRED_PERCENT,
  },
  row: {
    backgroundColor: PALETTE.WHITE,
  },
  separator: {
    height: 1,
    backgroundColor: PALETTE.ORANGE,
  },
  container: { flex: 1 },
});

export default GooglePlacesInput;
