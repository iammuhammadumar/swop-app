import React from 'react';
import { CameraOptions, launchImageLibrary } from 'react-native-image-picker';

import { FileAsset } from '~/types';

interface UseDeviceGalleryReturn {
  goToGallery(): Promise<Nullable<FileAsset>>;
}

interface UseDeviceGalleryProps extends Pick<CameraOptions, 'maxWidth' | 'maxHeight'> {}

export function useDeviceGallery({
  maxHeight,
  maxWidth,
}: UseDeviceGalleryProps = {}): UseDeviceGalleryReturn {
  const goToGallery = React.useCallback(async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    if (maxWidth !== undefined) {
      options.maxWidth = maxWidth;
    }

    if (maxHeight !== undefined) {
      options.maxHeight = maxHeight;
    }

    const { assets } = await launchImageLibrary(options);

    if (assets) {
      const photo = assets[0];
      if (!photo || !photo.uri || !photo.fileName || !photo.type) {
        return null;
      }
      return {
        uri: photo.uri,
        name: photo.fileName,
        type: photo.type,
      };
    }
    return null;
  }, [maxHeight, maxWidth]);

  return { goToGallery };
}
