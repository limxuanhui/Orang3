import { AWS_API_GATEWAY_S3_PRESIGNED_URLS_LIST } from '@env';
import axios, { AxiosResponse } from 'axios';
import { MediaMimeType } from '@components/feed/types/types';

export const printPrettyJson = (text: object) => {
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

export const getPresignedUrls = async (
  items: MediaMimeType[],
): Promise<{ presignedUrls: string[]; keys: string[] }> => {
  let getPresignedUrlsResponse: AxiosResponse;
  try {
    getPresignedUrlsResponse = await axios.post(
      AWS_API_GATEWAY_S3_PRESIGNED_URLS_LIST,
      items,
    );
  } catch (err) {
    console.error(err);
    return { presignedUrls: [], keys: [] };
  }

  const presignedUrls = getPresignedUrlsResponse.data.map(
    (el: { data: any }) => {
      if (el.data) {
        return el.data.url;
      }
    },
  );

  const keys = getPresignedUrlsResponse.data.map((el: { data: any }) => {
    if (el.data) {
      return el.data.key;
    }
  });

  return { presignedUrls, keys };
};

export const uploadMediaFiles = async (
  presignedUrls: string[],
  blobs: Blob[],
) => {
  let uploadMediaFilesResponse: AxiosResponse[];
  try {
    // Promise.all for uploading all the media files to s3
    uploadMediaFilesResponse = await Promise.all(
      presignedUrls.map((url: string, index: number) =>
        axios.put(url, blobs[index], {
          // Ensure blob data is not transformed (stringified) by axios in transformRequest
          // Refer to this link for more details: https://github.com/axios/axios/issues/2677
          transformRequest: data => data,
        }),
      ),
    );
  } catch (err) {
    console.error('Error uploading media files: ', err);
    return null;
  }

  return uploadMediaFilesResponse;
};
