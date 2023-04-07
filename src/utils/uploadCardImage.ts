import ImagePicker from 'react-native-image-crop-picker';

import { FileAsset } from '~/types';
import { getFileNameFromUrl } from '~/utils/getFileNameFromUrl';

export async function uploadCardImage(): Promise<FileAsset> {
  const image = await ImagePicker.openPicker({
    width: 1000,
    height: 1000,
    cropping: true,
    freeStyleCropEnabled: true,
  });

  return {
    name: getFileNameFromUrl(image.path),
    uri: image.path,
    type: image.mime,
  };
}
