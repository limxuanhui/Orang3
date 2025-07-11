import { useCallback } from 'react';
import { Image } from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

type ImageSize = { height: number; width: number };

const defaultImageLibraryOptions: ImageLibraryOptions = {
  mediaType: 'mixed',
  presentationStyle: 'fullScreen',
  selectionLimit: 1,
};

const useMediaHandlers = (
  imageLibraryOptions: ImageLibraryOptions = defaultImageLibraryOptions,
) => {
  const openGallery = useCallback(async () => {
    const mediaPickerResponse: ImagePickerResponse = await launchImageLibrary(
      imageLibraryOptions,
      (res: ImagePickerResponse) => {
        return res.assets ? res.assets : [];
      },
    );
    return mediaPickerResponse;
  }, [imageLibraryOptions]);

  const getImageSize = useCallback(
    async (imageUri: string): Promise<ImageSize> => {
      return new Promise<ImageSize>((resolve, reject) =>
        Image.getSize(
          imageUri,
          (width: number, height: number) =>
            resolve({
              width,
              height,
            }),
          reject,
        ),
      );
    },
    [],
  );

  const getMediaAspectRatio = useCallback((height: number, width: number) => {
    return width / height;
  }, []);

  return { openGallery, getImageSize, getMediaAspectRatio };
};

export default useMediaHandlers;
