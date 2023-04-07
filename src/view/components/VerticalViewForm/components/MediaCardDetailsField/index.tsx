import { useTheme } from '@shopify/restyle';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { FC } from 'react';
import { Control, useController, UseFieldArrayRemove } from 'react-hook-form';
import { Platform, Pressable, View } from 'react-native';
import { CameraOptions } from 'react-native-image-picker';

import { CardFormValues } from '~/store/modules/cardForm/types';
import PdfIcon from '~/view/assets/icons/mediaCardDetails/pdf.svg';
import Icon from '~/view/assets/icons/mediaCardDetails/photo.svg';
import VideoIcon from '~/view/assets/icons/mediaCardDetails/video.svg';
import { TextField } from '~/view/components/form/TextField';
import { IconContainer } from '~/view/components/IconContainer';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text } from '~/view/plugins/theme';

import { OpenCameraSheetAndroid, ShowActionSheetRef } from '../../cameraSheet/android';
import { ActionSheetOptionsTypes, openCameraSheetIos } from '../../cameraSheet/ios';
import { usePDFPicker } from '../../cameraSheet/pickers/filePicker';
import { useImagePicker } from '../../cameraSheet/pickers/photoPicker';

interface Props {
  remove: UseFieldArrayRemove;
  index: number;
  control: Control<CardFormValues>;
  name: string;
}

export const MediaCardDetailsField: FC<Props> = ({ remove, index, name, control }) => {
  const styles = useStyles();
  const { picture, getImageFromCamera, getImageFromLibrary, deleteImage } = useImagePicker();
  const { getPDFFromFiles, file, deletePDF } = usePDFPicker();
  const cameraRef = useRef<ShowActionSheetRef>(null);
  const cardData = useMemo(() => {
    if (name === 'Photo') {
      return { icon: <Icon color="white" />, title: 'Photo' };
    }
    if (name === 'Video') {
      return { icon: <VideoIcon color="white" />, title: 'Video' };
    }
    if (name === 'PDF') {
      return { icon: <SvgIcon name="pdf" width={20} height={20} />, title: 'PDF' };
    }
    return { icon: <PdfIcon color="white" /> };
  }, [name]);

  const {
    field: { value, onChange },
  } = useController({ name: `pictures.${index}.value`, control });
  const {
    field: { onChange: setFile },
  } = useController({ name: `pictures.${index}.file`, control });

  useEffect(() => {
    if (picture) {
      setFile(picture);
      onChange(picture.name);
      deleteImage();
    }

    if (file) {
      setFile(file);
      onChange(file.name);
      deletePDF();
    }
  }, [picture, file, setFile, onChange, deleteImage, deletePDF]);

  const setActionSheetOptions = useCallback(
    (mediaType: CameraOptions['mediaType']): ActionSheetOptionsTypes[] => {
      if (mediaType === 'video') {
        return ['Cancel', 'Take Video', 'Video Library'];
      }
      if (mediaType === 'photo') {
        return ['Cancel', 'Take Photo', 'Photo Library'];
      }
      return ['Cancel', 'Take Photo', 'Photo Library'];
    },
    [],
  );

  const mediaType: CameraOptions['mediaType'] = useMemo(() => {
    if (name === 'Photo') {
      return 'photo';
    }
    if (name === 'Video') {
      return 'video';
    }
    return 'mixed';
  }, [name]);

  const hendlerOpenCameraSheetMedia = (
    index: number,
    mediaType: CameraOptions['mediaType'],
  ): void => {
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

  const hendlerOpenCameraSheetPDF = (index: number): void => {
    switch (index) {
      case 1:
        getPDFFromFiles();
        break;

      default:
        deletePDF();
    }
  };

  const handlerPressPDF = () => {
    if (Platform.OS === 'android') {
      cameraRef?.current?.open();
    } else if (Platform.OS === 'ios') {
      openCameraSheetIos(
        (index: number) => hendlerOpenCameraSheetPDF(index),
        ['Cancel', 'Choose PDF'],
      );
    }
  };

  const handlerPressMedia = () => {
    if (Platform.OS === 'android') {
      cameraRef?.current?.open();
    } else if (Platform.OS === 'ios') {
      openCameraSheetIos(
        (index: number) => hendlerOpenCameraSheetMedia(index, mediaType),
        setActionSheetOptions(mediaType),
      );
    }
  };

  const handlePressDelete = () => {
    remove(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text variant="p1" style={styles.title}>
          Title & description
        </Text>
        <Pressable onPress={handlePressDelete}>
          <Text style={styles.delete}>Delete</Text>
        </Pressable>
      </View>
      <TextField
        name={`pictures.${index}.custom_name`}
        control={control}
        placeholder={name}
        style={styles.name}
      />
      <Pressable
        onPress={name === 'Photo' || name === 'Video' ? handlerPressMedia : handlerPressPDF}
      >
        <View style={styles.secondContainer}>
          <IconContainer style={styles.icon}>{cardData.icon}</IconContainer>
          <Text style={styles.text} variant="p2">
            {value}
          </Text>
        </View>
      </Pressable>
      {Platform.OS === 'android' && (
        <OpenCameraSheetAndroid
          mediaType="photo"
          handlerOnPress={
            name === 'Photo' || name === 'Video'
              ? hendlerOpenCameraSheetMedia
              : hendlerOpenCameraSheetPDF
          }
          ref={cameraRef}
          options={
            name === 'Photo' || name === 'Video'
              ? setActionSheetOptions(mediaType)
              : ['Cancel', 'Choose PDF']
          }
        />
      )}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    title: {
      color: theme.colors.gray1,
    },
    info: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 4,
    },
    delete: {
      color: theme.colors.delete,
    },
    secondContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray2,
      borderRadius: 6,
      height: 78,
    },
    container: {
      marginBottom: 18,
    },
    name: {
      marginBottom: 4,
      placeholderTextColor: theme.colors.delete,
    },
    removeBtn: {
      position: 'absolute',
      top: 24,
      right: 14,
    },
    icon: {
      marginLeft: 12,
    },
    text: {
      marginLeft: 14,
      flexShrink: 1,
    },
  };
});
