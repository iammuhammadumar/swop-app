import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { WalletScreen } from '~/view/screens/Wallet';
import { ContactsInCompanyScreen } from '~/view/screens/Wallet/ContactsInCompany';

import { WalletStackParamList } from './list';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const WalletStack = createStackNavigator<WalletStackParamList>();

export const WalletNavigator: React.FC = () => {
  return (
    <WalletStack.Navigator screenOptions={screenOptions}>
      <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
      <WalletStack.Screen name="ContactsInCompany" component={ContactsInCompanyScreen} />
    </WalletStack.Navigator>
  );
};
