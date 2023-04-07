import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ChooseMethodScreen } from '~/view/screens/CreateBusinessCard/ChooseMethod';
import { EnterEmailScreen } from '~/view/screens/CreateBusinessCard/EnterEmail';
import { FirstPreviewScreen } from '~/view/screens/CreateBusinessCard/FirstPreview';

import { CreateBusinessCardStackParamList } from './list';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const CreateBusinessCardStack = createStackNavigator<CreateBusinessCardStackParamList>();

export const CreateBusinessCardNavigator: React.FC = () => {
  return (
    <CreateBusinessCardStack.Navigator screenOptions={screenOptions}>
      <CreateBusinessCardStack.Screen name="ChooseMethod" component={ChooseMethodScreen} />
      <CreateBusinessCardStack.Screen name="EnterEmail" component={EnterEmailScreen} />
      <CreateBusinessCardStack.Screen name="FirstPreview" component={FirstPreviewScreen} />
    </CreateBusinessCardStack.Navigator>
  );
};
