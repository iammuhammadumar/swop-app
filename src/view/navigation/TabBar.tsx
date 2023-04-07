import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { TabBar } from '~/view/components/TabBar';
import { AccountNavigator } from '~/view/navigation/Settings';
import { WalletNavigator } from '~/view/navigation/Wallet';
import { HomeScreen } from '~/view/screens/Home';

import { TabsStackParamList } from './list';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const Tab = createBottomTabNavigator<TabsStackParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <TabBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen name="Wallet" component={WalletNavigator} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
};
