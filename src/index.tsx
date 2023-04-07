// import 'sheet.js';

import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { queryClient } from '~/services/queryClient';
import { persistor, store } from '~/store';
import { App } from '~/view/components/App';
import { theme } from '~/view/plugins/theme';

const RootApp: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider {...{ theme }}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <QueryClientProvider client={queryClient}>
            <StatusBar translucent backgroundColor="transparent" />
            <App />
          </QueryClientProvider>
          <FlashMessage position="top" />
        </SafeAreaProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

// eslint-disable-next-line import/no-default-export
export default RootApp;
