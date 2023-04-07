import { isString } from '@appello/common/lib/utils/string';
import React, { useMemo } from 'react';
import { Image, Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { isExternalLogo } from '~/store/modules/cardForm/utils';
import { FileAsset } from '~/types';
import { uploadCardImage } from '~/utils/uploadCardImage';
import CameraIcon from '~/view/assets/icons/camera.svg';
import { CardBox } from '~/view/components/CardBox';
import { IconContainer } from '~/view/components/IconContainer';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { CardType } from '../CreateCardButton/types';

interface Props {
  photo?: Nullable<FileAsset | string>;
  logo?: Nullable<FileAsset | string>;
  firstName?: string;
  lastName?: string;
  position?: string;
  style?: StyleProp<ViewStyle>;
  cardColor?: Nullable<string>;
  textColor?: string;
  isLogoBackgroundColorLoading?: boolean;
  logoBackgroundColor?: Nullable<string>;
  isManually?: boolean;
  isCardPhoto?: boolean;
  cardType?: CardType;
  cardName?: string;
  forView?: boolean;
  onPress?(): void;
  onPhotoUpload?(file: FileAsset): void;
  onLogoUpload?(file: FileAsset): void;
}

export const HorizontalCard: React.VFC<Props> = ({
  photo,
  logo,
  style,
  position = 'Position at Company',
  firstName,
  lastName,
  cardColor,
  textColor,
  isLogoBackgroundColorLoading,
  logoBackgroundColor,
  cardName = 'My Personal Card',
  isManually = false,
  onPress,
  isCardPhoto = false,
  onLogoUpload,
  onPhotoUpload,
  cardType,
  forView,
}) => {
  const theme = useTheme();
  const styles = useStyles({
    cardColor,
    textColor,
    logoBackgroundColor,
  });
  const fullName = useMemo(() => {
    if (!firstName?.trim() && !lastName?.trim()) {
      return 'Full Name';
    }

    return `${firstName ?? ''} ${lastName ?? ''}`.trim();
  }, [firstName, lastName]);

  const logoArea = React.useMemo(() => {
    if (isManually) {
      return logo ? (
        <Image
          source={{ uri: isString(logo) ? logo : logo.uri }}
          style={cardType !== CardType.PERSONAL ? styles.logoImage : styles.personalLogoImage}
          resizeMode={cardType !== CardType.PERSONAL ? 'center' : 'cover'}
        />
      ) : (
        <Image source={require('~/view/assets/images/logo-no-text.png')} style={styles.swopLogo} />
      );
    }
    if (!isLogoBackgroundColorLoading && logo) {
      return (
        <Image
          source={{ uri: isString(logo) ? logo : logo.uri }}
          style={cardType !== CardType.PERSONAL ? styles.logoImage : styles.personalLogoImage}
          resizeMode={
            cardType !== CardType.PERSONAL
              ? (isExternalLogo(isString(logo) ? logo : logo.uri) && 'contain') || 'cover'
              : 'cover'
          }
        />
      );
    }

    return cardType !== CardType.PERSONAL ? <Text style={styles.logoText}>Logo</Text> : undefined;
  }, [isLogoBackgroundColorLoading, isManually, logo, styles, cardType]);

  const uploadLogo = async () => {
    if (!onLogoUpload) {
      return;
    }
    const image = await uploadCardImage();
    onLogoUpload(image);
  };

  const uploadPhoto = async () => {
    if (!onPhotoUpload) {
      return;
    }

    const image = await uploadCardImage();
    onPhotoUpload(image);
  };

  if (isCardPhoto && photo) {
    return (
      <CardBox style={style} onPress={onPress}>
        <Image source={{ uri: isString(photo) ? photo : photo.uri }} style={styles.cardPhoto} />
      </CardBox>
    );
  }

  return (
    <CardBox style={style} onPress={onPress}>
      <View>
        <View style={styles.upSide}>
          <Pressable
            style={cardType === CardType.PERSONAL ? styles.personalPhotoArea : styles.photoArea}
            onPress={uploadPhoto}
            disabled={!!forView}
          >
            {photo ? (
              <Image
                source={{ uri: isString(photo) ? photo : photo.uri }}
                style={styles.photo}
                resizeMode="cover"
              />
            ) : (
              cardType !== CardType.PERSONAL && <SvgIcon name="user" size={64} fill="#959EAB" />
            )}

            {onPhotoUpload && (
              <IconContainer
                size={32}
                style={
                  cardType === CardType.PERSONAL && !photo
                    ? styles.personalImageBtn
                    : styles.imageBtn
                }
              >
                <CameraIcon
                  width={24}
                  height={24}
                  color={
                    cardType === CardType.PERSONAL && !photo ? theme.colors.gray1 : theme.colors.ink
                  }
                />
              </IconContainer>
            )}
            {cardType === CardType.PERSONAL && !photo && (
              <Text style={styles.personalAddText}>Add your profile picture</Text>
            )}
          </Pressable>

          {cardType !== CardType.PERSONAL && (
            <Pressable
              style={[
                styles.logoArea,
                logo && isExternalLogo(isString(logo) ? logo : logo?.uri)
                  ? styles.externalLogoStyle
                  : undefined,
              ]}
              onPress={uploadLogo}
              disabled={!!forView}
            >
              {logoArea}
              {onLogoUpload && (
                <IconContainer size={32} style={styles.imageBtn}>
                  <CameraIcon width={24} height={24} color={theme.colors.ink} />
                </IconContainer>
              )}
            </Pressable>
          )}
        </View>
        <View style={[styles.bottomSide]}>
          <Text variant="p2" style={styles.bottomText} fontFamily={FontFamily.SEMI_BOLD}>
            {fullName}
          </Text>
          <Text variant="c1" style={styles.bottomText} fontFamily={FontFamily.MEDIUM}>
            {cardType === CardType.PERSONAL
              ? cardName || 'My Personal Card'
              : position || 'Position at Company'}
          </Text>
        </View>
      </View>
    </CardBox>
  );
};

const CARD_HEIGHT = 204;
const CARD_FOOTER_HEIGHT = 60;
const CARD_CONTENT_HEIGHT = CARD_HEIGHT - CARD_FOOTER_HEIGHT;

const useStyles = makeStyles(
  ({
    cardColor,
    textColor,
    logoBackgroundColor,
  }: Pick<Props, 'cardColor' | 'textColor' | 'logoBackgroundColor'>) => {
    const theme = useTheme();

    return {
      cardPhoto: {
        width: '100%',
        height: '100%',
      },
      photo: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
      personalLogoImage: {
        flex: 1,
        width: '100%',
      },
      logoImage: {
        flex: 1,
        width: '100%',
        height: 65,
      },
      externalLogoStyle: {
        padding: 10,
      },
      swopLogo: {
        width: 65,
        height: 65,
      },
      upSide: {
        flexDirection: 'row',
        height: CARD_CONTENT_HEIGHT,
      },
      bottomSide: {
        backgroundColor: cardColor || theme.colors.primary,
        height: CARD_FOOTER_HEIGHT,
        paddingTop: 8,
        paddingHorizontal: 20,
      },
      personalPhotoArea: {
        width: '100%',
        backgroundColor: theme.colors.gray2,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      photoArea: {
        width: 139,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      personalAddText: {
        color: theme.colors.gray1,
      },
      logoArea: {
        backgroundColor: logoBackgroundColor || theme.colors.gray2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: '100%',
        height: '100%',
      },
      logoText: {
        color: theme.colors.white,
        fontFamily: FontFamily.SEMI_BOLD,
        fontSize: 24,
        letterSpacing: -0.41,
      },
      bottomText: {
        color: textColor || theme.colors.white,
      },

      imageBtn: {
        backgroundColor: theme.colors.white,
        position: 'absolute',
        right: 10,
        top: 10,
      },
      personalImageBtn: {
        backgroundColor: theme.colors.gray2,
      },
    };
  },
);
