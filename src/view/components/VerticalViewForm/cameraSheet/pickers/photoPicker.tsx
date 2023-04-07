import { useCallback, useMemo, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';

import { logger } from '~/utils/logger';

import { pickName } from '../helpers';

export interface FileProps {
  uri: string;
  name: string;
  type: string;
}

interface UseImagePicker {
  getImageFromLibrary: (mediaType: CameraOptions['mediaType']) => void;
  getImageFromCamera: (mediaType: CameraOptions['mediaType']) => void;
  deleteImage: () => void;
  picture: FileProps | null;
}

export const useImagePicker = (): UseImagePicker => {
  const [picture, setPicture] = useState<FileProps | null>(null);

  const saveImage = (image: ImagePickerResponse): void => {
    if (image.assets && image.assets[0].uri) {
      const { uri, type } = image.assets[0];
      const name = pickName(uri);
      setPicture({
        name,
        uri,
        type: type || 'photo',
      });
    }
  };

  const getImageFromCamera = useCallback(async (mediaType = 'photo') => {
    try {
      const options: CameraOptions = {
        mediaType,
      };
      let imageRes;
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          imageRes = await launchCamera(options);
        }
      } else {
        const permisionRes = await request(PERMISSIONS.IOS.CAMERA);
        if (permisionRes !== 'blocked' && permisionRes !== 'denied') {
          imageRes = await launchCamera(options);
        }
      }
      if (imageRes) {
        saveImage(imageRes);
      }
    } catch (error) {
      logger.warn(error);
    }
  }, []);

  const getImageFromLibrary = useCallback(async (mediaType = 'photo') => {
    try {
      const options: CameraOptions = {
        mediaType,
      };
      let imageRes;
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          imageRes = await launchImageLibrary(options);
        }
      } else {
        imageRes = await launchImageLibrary(options);
      }
      if (imageRes) {
        saveImage(imageRes);
      }
    } catch (error) {
      logger.warn(error);
    }
  }, []);

  const deleteImage = useCallback(() => {
    setPicture(null);
  }, []);

  return useMemo(
    () => ({
      getImageFromLibrary,
      getImageFromCamera,
      deleteImage,
      picture,
    }),
    [getImageFromLibrary, getImageFromCamera, deleteImage, picture],
  );
};
