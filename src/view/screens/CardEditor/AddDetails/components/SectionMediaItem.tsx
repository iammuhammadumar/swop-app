import { isString } from '@appello/common/lib/utils/string';
import React, { FC, memo, ReactElement, useCallback, useEffect, useRef } from 'react';
import { Dimensions, Platform, Pressable, StyleProp, ViewStyle } from 'react-native';
import { CameraOptions } from 'react-native-image-picker';

import { IconContainer } from '~/view/components/IconContainer';
import {
  OpenCameraSheetAndroid,
  ShowActionSheetRef,
} from '~/view/components/VerticalViewForm/cameraSheet/android';
import {
  ActionSheetOptionsTypes,
  openCameraSheetIos,
} from '~/view/components/VerticalViewForm/cameraSheet/ios';
import { useImagePicker } from '~/view/components/VerticalViewForm/cameraSheet/pickers/photoPicker';
import { AddCardDetailsOptions } from '~/view/navigation/list';
import { makeStyles, Text } from '~/view/plugins/theme';

interface SectionItemProps {
  iconImage: string | ReactElement;
  color?: string;
  name: string;
  onSelect: (id: number, options: AddCardDetailsOptions) => void;
  id: number;
  containerStyles?: StyleProp<ViewStyle>;
  mediaType: CameraOptions['mediaType'];
}

const { width: windowWidth } = Dimensions.get('window');

export const SectionMediaItem: FC<SectionItemProps> = memo(
  ({ iconImage, color, name, containerStyles, onSelect, id, mediaType }) => {
    const styles = useStyles();
    const cameraRef = useRef<ShowActionSheetRef>(null);
    const { picture, getImageFromCamera, getImageFromLibrary, deleteImage } = useImagePicker();
    useEffect(() => {
      if (picture) {
        onSelect(id, {
          sectionType: 'pictures',
          item: {
            type: {
              id,
              name,
              logo: isString(iconImage) ? iconImage : '',
              is_file: true,
            },
            custom_name: '',
            value: picture.name,
            file: picture,
            editable: true,
          },
        });
        deleteImage();
      }
    }, [onSelect, id, picture, mediaType, deleteImage, iconImage, name]);
    const setActionSheetOptions = useCallback((): ActionSheetOptionsTypes[] => {
      if (mediaType === 'video') {
        return ['Cancel', 'Take Video', 'Video Library'];
      }
      if (mediaType === 'photo') {
        return ['Cancel', 'Take Photo', 'Photo Library'];
      }
      return ['Cancel', 'Take Photo', 'Photo Library'];
    }, [mediaType]);
    const hendlerOpenCameraSheet = (index: number, mediaType: CameraOptions['mediaType']): void => {
      switch (index) {
        case 1:
          getImageFromCamera(mediaType);
          break;
        case 2:
          getImageFromLibrary(mediaType);
          break;
        default:
          deleteImage();
      }
    };

    const onPressHandler = () => {
      if (Platform.OS === 'android') {
        cameraRef?.current?.open();
      } else if (Platform.OS === 'ios') {
        openCameraSheetIos(
          (index: number) => hendlerOpenCameraSheet(index, mediaType),
          setActionSheetOptions(),
        );
      }
    };

    return (
      <>
        <Pressable style={[styles.root, containerStyles]} onPress={onPressHandler}>
          {typeof iconImage === 'string' ? (
            <IconContainer style={styles.icon} {...{ iconImage }} color={color} />
          ) : (
            <IconContainer style={styles.icon}>{iconImage}</IconContainer>
          )}
          <Text fontWeight="500" variant="c1">
            {name}
          </Text>
        </Pressable>
        {Platform.OS === 'android' && (
          <OpenCameraSheetAndroid
            mediaType={mediaType}
            handlerOnPress={hendlerOpenCameraSheet}
            ref={cameraRef}
            options={setActionSheetOptions()}
          />
        )}
      </>
    );
  },
);

const useStyles = makeStyles({
  icon: {
    marginBottom: 6,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 3,
    paddingVertical: 21,
  },
});
