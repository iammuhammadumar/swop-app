import { isString } from '@appello/common/lib/utils/string';
import React, { FC } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { isExternalLogo } from '~/store/modules/cardForm/utils';
import { FileAsset } from '~/types';
import { uploadCardImage } from '~/utils/uploadCardImage';
import CameraIcon from '~/view/assets/icons/camera.svg';
import { IconContainer } from '~/view/components/IconContainer';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, useTheme } from '~/view/plugins/theme';

interface Props {
  photo: Nullable<FileAsset | string>;
  background: Nullable<FileAsset | string>;
  onPhotoUpload?(file: FileAsset): void;
  onBackgroundUpload?(file: FileAsset): void;
  allow_change_cover_photo?: boolean;
  allow_change_vertical_profile_picture?: boolean;
}

export const VerticalCardHeader: FC<Props> = ({
  photo,
  background,
  onPhotoUpload,
  onBackgroundUpload,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  allow_change_cover_photo,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  allow_change_vertical_profile_picture,
}) => {
  const styles = useStyles();
  const theme = useTheme();

  const uploadBackground = async () => {
    if (!onBackgroundUpload || !allow_change_cover_photo) {
      return;
    }
    const image = await uploadCardImage();
    onBackgroundUpload(image);
  };

  const uploadPhoto = async () => {
    if (!onPhotoUpload || !allow_change_vertical_profile_picture) {
      return;
    }
    const image = await uploadCardImage();
    onPhotoUpload(image);
  };

  return (
    <View>
      <Pressable onPress={uploadBackground}>
        <Image
          source={
            background
              ? { uri: isString(background) ? background : background.uri }
              : require('./emptyState.jpg')
          }
          resizeMode={
            isExternalLogo(isString(background) ? background : background?.uri || '')
              ? 'contain'
              : 'cover'
          }
          style={styles.background}
        />
        {onBackgroundUpload && allow_change_cover_photo && (
          <IconContainer color={theme.colors.white} size={32} style={styles.backgroundUploadIcon}>
            <CameraIcon width={24} height={24} color={theme.colors.ink} />
          </IconContainer>
        )}
      </Pressable>
      <Pressable style={styles.photo} onPress={uploadPhoto}>
        {photo && (
          <>
            <Image style={styles.avatar} source={{ uri: isString(photo) ? photo : photo.uri }} />
            <View style={{ position: StyleSheet.absoluteFillObject.position }}>
              <CameraIcon width={32} height={32} color={theme.colors.white} />
            </View>
          </>
        )}
        {!photo && onPhotoUpload && (
          <View style={styles.uploadLayer}>
            <CameraIcon width={32} height={32} color={theme.colors.gray1} />
          </View>
        )}
        {!photo && !onPhotoUpload && (
          <View style={styles.uploadLayer}>
            <SvgIcon name="user" size={64} fill="#959EAB" />
          </View>
        )}
      </Pressable>
      <View style={styles.brand}>
        <Image
          source={require('~/view/assets/images/full-logo.png')}
          style={{ width: 55, height: 16 }}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    backgroundUploadIcon: {
      position: 'absolute',
      right: 10,
      top: 10,
    },
    brand: {
      borderTopLeftRadius: 20,
      height: 38,
      width: 97,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      bottom: 0,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.gray2,
      paddingTop: 3,
      paddingLeft: 5,
    },
    uploadLayer: {
      backgroundColor: theme.colors.gray2,
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      height: 90,
      borderRadius: 90 / 2,
    },
    background: {
      width: '100%',
      height: 195,
    },
    photo: {
      width: 104,
      height: 104,
      backgroundColor: theme.colors.white,
      borderRadius: 104 / 2,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: -35,
      left: 25,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 90 / 2,
    },
  };
});
