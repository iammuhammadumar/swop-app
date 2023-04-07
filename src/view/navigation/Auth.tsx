import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { OnboardingScreen } from '~/view/screens/Onboarding';
import { ResetPasswordScreen } from '~/view/screens/ResetPassword';
import { SignInScreen } from '~/view/screens/SignIn';
import { SignUpScreen } from '~/view/screens/SignUp';

import { AuthStackParamList } from './list';

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const AuthStack = createStackNavigator<AuthStackParamList>();
export const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={screenOptions} initialRouteName="Onboarding">
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
};
