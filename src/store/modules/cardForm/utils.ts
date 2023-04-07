import axios, { AxiosResponse } from 'axios';

import { BRANDFETCH_TOKEN } from '~/constants/env';

import { theme } from '../../../view/plugins/theme/theme';

const LOGO_URI = 'https://logo.clearbit.com/';

export interface CardDataFromBrandRequest {
  horizontalLogo: string;
  verticalLogo: string;
  cardColor: string;
  logoColorType: string;
}

interface LogoFormat {
  background: null | string;
  format: string;
  height: number;
  size: number;
  src: string;
  width: string;
}

interface LogosFromBrandFatch {
  type: string;
  theme: string;
  formats: LogoFormat[];
}

interface ColorBrandFetch {
  brightness: number;
  gex: string;
  type: string;
}

const setLogoSrc = (
  logos: LogosFromBrandFatch[],
): { horizontalLogo: string; verticalLogo: string; logoColorType: string } => {
  if (!logos.length) {
    return {
      horizontalLogo: '',
      verticalLogo: '',
      logoColorType: '',
    };
  }
  const horizontalLogos =
    logos?.find((item: LogosFromBrandFatch) => item.type === 'symbol' && item.theme === 'dark') ||
    logos?.find((item: LogosFromBrandFatch) => item.type === 'logo' && item.theme === 'dark') ||
    logos[0];

  const horizontalLogo =
    (horizontalLogos && horizontalLogos.formats.find(item => item.format === 'png')?.src) ||
    (horizontalLogos && horizontalLogos.formats.find(item => item.format === 'jpeg')?.src) ||
    (horizontalLogos && horizontalLogos.formats[0].src);

  const verticalLogos = logos?.find((item: LogosFromBrandFatch) => item.type === 'logo')?.formats;
  const verticalLogo = verticalLogos && verticalLogos.find(item => item.format === 'png')?.src;

  return {
    horizontalLogo: horizontalLogo || '',
    verticalLogo: verticalLogo || '',
    logoColorType: horizontalLogos.theme,
  };
};

export const getLogoFromBrandFetch = async (email: string): Promise<CardDataFromBrandRequest> => {
  const match = email.match(/(.*)@(.*)/);

  const obj = {
    link: `https://api.brandfetch.io/v2/brands/${match && match[2]}`,
    config: {
      headers: {
        Authorization: `Bearer ${BRANDFETCH_TOKEN}`,
      },
    },
  };

  const data = await axios
    .get(obj.link, obj.config)
    .then((responseData: AxiosResponse) => {
      return responseData.data;
    })
    .catch(() => {});
  if (!data) {
    return {
      horizontalLogo: '',
      verticalLogo: '',
      cardColor: theme.colors.brand,
      logoColorType: '',
    };
  }

  const cardsData: CardDataFromBrandRequest = {
    ...setLogoSrc(data.logos),
    cardColor:
      data?.colors?.find((item: ColorBrandFetch) => item.type === 'dark')?.hex ||
      data?.colors[0]?.hex,
  };
  return cardsData;
};

export function getCompanyLogoFromEmail(email: string): Nullable<string> {
  const match = email.match(/(.*)@(.*)/);

  if (!match) {
    return null;
  }
  return `${LOGO_URI}${match[2]}?size=512`;
}

export function isExternalLogo(uri: string): boolean {
  return uri.startsWith(LOGO_URI) || uri.includes('logo_') || uri.includes('brandfetch');
}
