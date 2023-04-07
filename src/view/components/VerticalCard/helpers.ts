import { isString } from '@appello/common/lib/utils/string';
import { Linking, Platform } from 'react-native';

import { GOOGLE_PLACE_KEY_IOS } from '~/constants/env';
import { PersonalDetails } from '~/models/businessCard';
import { CoordinatesInput, FileAsset } from '~/types';

export const getDetailByName = (
  name: [string, string],
  details?: PersonalDetails[],
): string | undefined | null => {
  if (details) {
    const item = details.find(item => item.name === name[0] || item.name === name[1]);
    return item?.value;
  }
  return null;
};

export const sortPersonalDitails = (personalDitails: PersonalDetails[]): PersonalDetails[] => {
  let result: PersonalDetails[] = [];

  personalDitails.forEach(el => {
    if (el.name.toLowerCase() === 'position') {
      result[0] = el;
    } else if (el.name.toLowerCase() === 'team' || el.name === 'team_name') {
      result[1] = el;
    } else if (el.name.toLowerCase() === 'department') {
      result[2] = el;
    } else if (el.name.toLowerCase() === 'company') {
      result[3] = el;
    }
  });

  result = result.filter(el => el.value);

  return result;
};

export const isLink = (str: string): boolean => {
  return str.startsWith('http');
};

interface ShowInMapParams {
  coordinates?: CoordinatesInput;
  address: string;
}

const openMapCoordinates = ({
  coordinates,
  label,
}: {
  coordinates: CoordinatesInput;
  label: string;
}) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });

  const latLng = `${coordinates.latitude},${coordinates.longitude}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  if (url) {
    Linking.openURL(url);
  }
};

const showAddressInMap = ({ coordinates, address }: ShowInMapParams) => {
  if (coordinates?.latitude && coordinates?.latitude) {
    openMapCoordinates({
      coordinates,
      label: address,
    });
  } else {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_PLACE_KEY_IOS}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          return;
        }
        const { lat, lng } = data.results[0].geometry.location;

        openMapCoordinates({
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          label: address,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
};

export const onSocialInfoBadgeHandler = (
  name: string,
  value: string,
  coordinates: CoordinatesInput,
  file?: FileAsset | string,
): void => {
  if (file) {
    if (isString(file)) {
      Linking.openURL(file);
    }
  } else if (name.toLowerCase() === 'phone') {
    Linking.openURL(`tel:${`+61${value}`}`);
  } else if (name.toLowerCase() === 'email') {
    Linking.openURL(`mailto:${value}`);
  } else if (name.toLowerCase() === 'address') {
    showAddressInMap({ address: value, coordinates });
  } else if (isLink(value)) {
    Linking.openURL(value);
  } else {
    Linking.openURL(`https://${value}`);
  }
};
