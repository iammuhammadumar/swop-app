import dynamicLinks from '@react-native-firebase/dynamic-links';

import { CardType } from '~/view/components/CreateCardButton/types';

interface BuildLinkParams {
  id: number;
  cardType: CardType;
}

export async function buildLink({ id, cardType }: BuildLinkParams): Promise<string> {
  const link = await dynamicLinks().buildShortLink(
    {
      link: `http://swop-front-dev.appelloproject.xyz/view-card/${id}/${cardType}`,
      domainUriPrefix: 'https://swopdev.page.link',
      android: {
        packageName: 'com.swop',
      },
      ios: {
        bundleId: 'com.appello.swop',
        appStoreId: '1617023438',
        fallbackUrl: `http://swop-front-dev.appelloproject.xyz/view-card/${id}`,
      },
      navigation: {
        // forcedRedirectEnabled: true,
      },
    },
    dynamicLinks.ShortLinkType.DEFAULT,
  );
  return link;
}
