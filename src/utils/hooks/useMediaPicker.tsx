import { useCallback } from "react";
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from "react-native-image-picker";

type useMediaPickerProps = {
  imageLibraryOptions: ImageLibraryOptions;
};

const useMediaPicker = ({ imageLibraryOptions }: useMediaPickerProps) => {
  const openGallery = useCallback(async () => {
    const mediaPickerResponse: ImagePickerResponse = await launchImageLibrary(
      imageLibraryOptions,
      (res: ImagePickerResponse) => {
        console.log("useMediaPicker picked: ", res.assets);
        return res.assets ? res.assets : [];
      },
    );
    return mediaPickerResponse;
  }, [launchImageLibrary]);

  return { openGallery };
};

export default useMediaPicker;
