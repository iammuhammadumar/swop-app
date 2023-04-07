import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { AppNavigator } from '~/view/navigation/App';

export const App: React.FC = () => {
  useEffect(() => {
    RNBootSplash.hide({
      fade: true,
    });
  }, []);

  return <AppNavigator />;
};
