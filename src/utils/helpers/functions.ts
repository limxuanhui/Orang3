import Config from 'react-native-config';
import axios, { AxiosResponse } from 'axios';
import { MediaMimeType } from '@components/feed/types/types';
import { RouteNodeCoord } from '@components/itinerary/types/types';
import { LatLngTuple, decode, encode } from '@googlemaps/polyline-codec';

export const printPrettyJson = (text: object | string | null | undefined) => {
  console.info(JSON.stringify(text, null, 4));
};

export const getBlobsFromLocalUris = async (
  uris: string[],
): Promise<Blob[]> => {
  let blobs: Blob[] = [];
  try {
    blobs = await Promise.all(
      uris.map(async (uri: string) => {
        const blobResponse = await fetch(uri.replace('file:///', 'file:/'));
        const blob = await blobResponse.blob();
        return blob;
      }),
    );
  } catch (err) {
    console.error('Error creating blob: ', err);
    return [];
  }

  return blobs;
};

export type UploadMediaDetails = {
  presignedUrl: string;
  key: string;
};

export const getPresignedUrls = async (
  items: MediaMimeType[],
): Promise<UploadMediaDetails[]> => {
  let getPresignedUrlsResponse: AxiosResponse;
  const AWS_API_GATEWAY_S3_PRESIGNED_URLS_LIST: string =
    Config.AWS_API_GATEWAY_S3_PRESIGNED_URLS_LIST as string;
  try {
    getPresignedUrlsResponse = await axios.post(
      AWS_API_GATEWAY_S3_PRESIGNED_URLS_LIST,
      items,
    );
  } catch (err) {
    console.error(err);
    return [];
  }

  const uploadMediaDetails = getPresignedUrlsResponse.data.map(
    (el: { data: { url: string; key: string } }) => {
      if (el.data) {
        return { presignedUrl: el.data.url, key: el.data.key };
      }
    },
  );

  return uploadMediaDetails;
};

export const uploadMediaFiles = async (
  presignedUrls: string[],
  blobs: Blob[],
) => {
  let uploadMediaFilesResponse: AxiosResponse[];
  try {
    // Promise.all for uploading all the media files to s3
    uploadMediaFilesResponse = await Promise.all(
      presignedUrls.map((url: string, index: number) => {
        return axios.put(url, blobs[index], {
          // Ensure blob data is not transformed (stringified) by axios in transformRequest
          // Refer to this link for more details: https://github.com/axios/axios/issues/2677
          transformRequest: data => data,
        });
      }),
    );
  } catch (err) {
    console.error('Error uploading media files: ', err);
    return null;
  }

  return uploadMediaFilesResponse;
};

export const decodePolyline = (encodedPolyline: string): RouteNodeCoord[] => {
  const coordinates: LatLngTuple[] = decode(encodedPolyline);
  return coordinates.map(coord => ({
    latitude: coord[0],
    longitude: coord[1],
  }));
};

export const encodePolyline = (polyline: RouteNodeCoord[]) => {
  const encodedPolyline = encode(
    polyline.map(coord => [coord.latitude, coord.longitude]),
  );
  return encodedPolyline;
};

export const ellipsizeText = (text: string, maxLength: number) => {
  const ending = '...';
  if (text.length <= maxLength) {
    return text;
  }

  const maxShortenedLength = maxLength - ending.length;
  if (maxShortenedLength <= 0) {
    return text;
  }

  let lastSpaceIndex;
  for (var i = maxShortenedLength; i >= 0; i--) {
    if (text.charAt(i) !== ' ') {
      continue;
    } else {
      lastSpaceIndex = i;
      break;
    }
  }

  if (lastSpaceIndex === 0) {
    return text;
  }

  const shortenedText = text.slice(0, lastSpaceIndex) + ending;
  return shortenedText;
};

export const sleep = (ms: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const getImageUrl = (uri: string, res: 'raw' | 'thumbnail') => {
  if (!uri) {
    throw Error('Invalid image uri provided');
  }

  if (uri.includes('google')) {
    return uri;
  }

  switch (res) {
    case 'raw':
      return `${Config.AWS_CLOUDFRONT_URL_RAW}/${uri}`;
    case 'thumbnail':
      return `${Config.AWS_CLOUDFRONT_URL_THUMBNAIL}/${uri}`;
    default:
      throw Error('Invalid res provided');
  }
};
