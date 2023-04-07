import { utils } from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types';
import { Linking } from 'react-native';

const config = {
  screens: {
    BusinessCard: 'view-card/:id/:cardType',
  },
};

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [
    'swop://',
    'https://swop.page.link',
    'https://swopdev.page.link',
    'http://swop-front-dev.appelloproject.xyz',
    'https://swop-front-dev.appelloproject.xyz',
  ],
  // Custom function to get the URL which was used to open the app
  async getInitialURL() {
    // First, you would need to get the initial URL from your third-party integration
    // The exact usage depend on the third-party SDK you use
    // For example, to get to get the initial URL for Firebase Dynamic Links:
    const { isAvailable } = utils().playServicesAvailability;

    if (isAvailable) {
      const initialLink = await dynamicLinks().getInitialLink();

      if (initialLink) {
        return initialLink.url;
      }
    }

    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL();

    return url;
  },

  // Custom function to subscribe to incoming links
  subscribe(listener) {
    // Listen to incoming links from Firebase Dynamic Links
    const unsubscribeFirebase = dynamicLinks().onLink(({ url }) => {
      listener(url);
    });

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      // Clean up the event listeners
      unsubscribeFirebase();
      linkingSubscription.remove();
    };
  },
  config,
};
