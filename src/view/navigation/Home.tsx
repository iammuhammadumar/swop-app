import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeScreen } from '~/view/screens/Home';

import { HomeStackPatamList } from './list';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const HomeStack = createStackNavigator<HomeStackPatamList>();
export const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
