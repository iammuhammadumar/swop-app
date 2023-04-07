import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ChangePasswordScreen } from '~/view/screens/ChangePassword/ChangePassword';
import { AccountScreen } from '~/view/screens/SettingsStack/Account';
import { EditProfileScreen } from '~/view/screens/SettingsStack/EditProfile';
import { InviteConnectionsScreen } from '~/view/screens/SettingsStack/InviteConnections';

import { AccountStackParamList } from './list';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const AccountStack = createStackNavigator<AccountStackParamList>();

export const AccountNavigator: React.FC = () => {
  return (
    <AccountStack.Navigator screenOptions={screenOptions}>
      <AccountStack.Screen name="Account" component={AccountScreen} />
      <AccountStack.Screen name="EditProfile" component={EditProfileScreen} />
      <AccountStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <AccountStack.Screen name="InviteConnections" component={InviteConnectionsScreen} />
    </AccountStack.Navigator>
  );
};
