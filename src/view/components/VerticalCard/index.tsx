import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { Accreditations, CardModel } from '~/models/businessCard';
import { IconsType } from '~/store/modules/cardForm/consts';
import { CardFormValues } from '~/store/modules/cardForm/types';
import { useGetSocialGroupQuery } from '~/store/query/socials';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

import { CardType } from '../CreateCardButton/types';
import { SocialInfoBadge } from './components/SocialInfoBadge';
import { VerticalCardHeader } from './components/VerticalCardHeader';
import { getDetailByName, onSocialInfoBadgeHandler, sortPersonalDitails } from './helpers';

interface Props {
  style?: ViewStyle;
  fields: CardModel | Partial<CardFormValues>;
  cardType?: CardType;
}

export const VerticalCard: React.VFC<Props> = ({ style, fields, cardType }) => {
  const styles = useStyles();
  const { data } = useGetSocialGroupQuery();
  const values = useMemo(() => {
    const isModel = 'id' in fields;

    return {
      iconsType: IconsType.CIRCLES,
      firstName: fields.firstName,
      lastName: fields.lastName,
      verticalProfilePhoto:
        cardType === CardType.PERSONAL
          ? fields.photo || fields.horizontalProfilePhoto
          : fields.verticalPhoto || fields.verticalProfilePhoto,
      verticalCompanyLogo: fields.verticalCompanyLogo || fields.verticalLogo,
      profilePhoto: isModel ? fields.verticalPhoto : fields.verticalProfilePhoto,
      companyLogo: isModel ? fields.verticalLogo : fields.verticalLogo,
      bio: fields?.personalDetails?.length
        ? getDetailByName(['Bio', 'bio'], fields.personalDetails)
        : fields.bio,
      social_links: fields.social_links,
      pictures: fields.pictures,
      position: fields.position,
      accreditations: fields.accreditations,
      personalDetails: fields?.personalDetails?.filter(item => {
        return item?.name !== 'Bio' && item?.name !== 'bio';
      }),
      horizontalIconColor: fields.horizontalIconColor,
    };
  }, [fields, cardType]);
  const formatedIconsData = useMemo(() => {
    const forFindData = data
      ?.map(el => el.data)
      .reduce((acc, el) => {
        return acc.concat(el);
      }, []);
    return forFindData;
  }, [data]);

  const fullName = useMemo(() => {
    if (!values.firstName?.trim() && !values.lastName?.trim()) {
      return 'Full Name';
    }
    return `${values.firstName ?? ''} ${values.lastName ?? ''}`.trim();
  }, [values.firstName, values.lastName]);

  const renderAccreditations = (item: Accreditations, index: number) => (
    <View key={index} style={styles.accreditations}>
      <Text variant="p2">{item.value || (typeof item === 'string' && item) || ''}</Text>
    </View>
  );
  const findLogo = (type: number | undefined): string | undefined => {
    const logo = formatedIconsData?.find(item => item.id === type)?.logo;
    return typeof logo === 'string' ? logo : undefined;
  };
  const isContactDetails = (name: string): boolean => {
    const contactDetails = ['Email', 'Phone', 'Address', 'Webbsate'];
    return contactDetails.includes(name);
  };

  return (
    <View style={style}>
      <VerticalCardHeader
        photo={values?.verticalProfilePhoto || null}
        background={values?.verticalCompanyLogo || null}
      />
      <View style={styles.content}>
        <Text style={styles.fullName}>{fullName}</Text>
        {values?.personalDetails &&
          sortPersonalDitails(values?.personalDetails).map((item, index) => (
            <Text key={index} style={styles.description}>
              {item?.value || item || ''}
            </Text>
          ))}
        <View style={styles.row}>
          {Boolean(values.accreditations) && values.accreditations?.map(renderAccreditations)}
        </View>

        {Boolean(values.bio) && (
          <Text variant="p2" style={styles.bio}>
            {values.bio}
          </Text>
        )}
        {values?.social_links?.concat(values?.pictures || [])?.map((item, index) => (
          <SocialInfoBadge
            onPress={() =>
              onSocialInfoBadgeHandler(
                item.type?.name,
                item.value,
                {
                  latitude: item.latitude || 0,
                  longitude: item.longitude || 0,
                },
                item.file,
              )
            }
            iconTypeName={item?.type?.name}
            key={index}
            color={values.horizontalIconColor}
            iconsType={values.iconsType}
            iconImage={item?.type?.logo || findLogo(item?.type?.id)}
            name={item?.custom_name}
            value={
              isContactDetails(item?.type?.name) ? item?.value : item?.custom_name || item?.value
            }
          />
        ))}
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    row: {
      flexDirection: 'row',
      marginTop: 18,
    },
    bio: {
      marginTop: 20,
      marginBottom: 10,
    },
    fullName: {
      color: theme.colors.primary,
      fontSize: 30,
      fontFamily: FontFamily.SEMI_BOLD,
      marginBottom: 10,
    },
    description: {
      fontFamily: FontFamily.MEDIUM,
      fontSize: theme.textSize.xxl,
      lineHeight: 30,
    },
    userIcon: {
      alignSelf: 'center',
      marginTop: -75,
    },
    companyLogo: {
      maxWidth: 60,
      height: 60,
      aspectRatio: 1,
      flex: 1,
      position: 'absolute',
      top: -65,
      left: 25,
      borderRadius: 10,
    },
    swopLogo: {
      maxWidth: 45,
      height: 45,
      flex: 1,
      position: 'absolute',
      top: -65,
      left: 25,
    },
    photo: {
      width: '100%',
      height: '100%',
    },
    photoContainer: {
      flex: 1,
      height: 366,
      alighItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F2F2F2',
      position: 'relative',
    },
    camera: {
      position: 'absolute',
      right: 25,
      bottom: 45,
      width: 35,
      height: 35,
      backgroundColor: theme.colors.white,
      alighItems: 'center',
      justifyContent: 'center',
      borderRadius: 35 / 2,
      zIndex: 100,
    },
    content: {
      paddingHorizontal: 25,
      marginTop: 56,
    },
    shapeImage: {
      width: '100%',
      height: 75,
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
    },
    accreditations: {
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: theme.colors.gray2,
      marginRight: 8,
      flexWrap: 'wrap',
    },
  };
});
