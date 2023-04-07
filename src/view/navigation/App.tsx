import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
// import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import { useAppSelector } from '~/store/hooks';
import { useLazyGetUserQuery } from '~/store/query/user';
import { AuthNavigator } from '~/view/navigation/Auth';
import { CreateBusinessCardNavigator } from '~/view/navigation/CreateBusinessCard';
import { TabNavigator } from '~/view/navigation/TabBar';
import { AddContactManuallyScreen } from '~/view/screens/AddContactManually';
import { AddContactViaScanCardScreen } from '~/view/screens/AddContactViaScanCard';
import { BusinessCardScreen } from '~/view/screens/BusinessCard';
import { CardEditorScreen } from '~/view/screens/CardEditor';
import { PreviewScreen } from '~/view/screens/CardEditor/PreviewScreen';
import { SelectSocialScreen } from '~/view/screens/CardEditor/SelectSocial';
import { CorporateInvitationScreen } from '~/view/screens/CorporateInvitation';
import { ColorPickerScreen } from '~/view/screens/CreateBusinessCard/ColorPicker';
import { CreateProfileScreen } from '~/view/screens/CreateProfile';
import { NotificationsScreen } from '~/view/screens/Notifications/Notifications';
import { ScanCardQRCodeScreen } from '~/view/screens/ScanCardQRCode';

import { AddSocialsScreen } from '../screens/AddContactManually/components/AddSocials';
import { AddCardDetailsScreen } from '../screens/CardEditor/AddDetails';
import { linking } from './linking';
import { RootStackParamList } from './list';

const AppStack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

// keep in mind naming "swop" is using also in native ios/android code

export const AppNavigator: React.FC = () => {
  const { auth, profile } = useAppSelector(state => state.user);
  const [getUser] = useLazyGetUserQuery();
  const navigationRef = createNavigationContainerRef<RootStackParamList>();

  useEffect(() => {
    if (auth) {
      getUser();
    }
  }, [auth, getUser]);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <AppStack.Navigator {...{ screenOptions }}>
        {!auth && <AppStack.Screen name="Auth" component={AuthNavigator} />}
        {auth && (
          <>
            {profile?.isNew && (
              <AppStack.Screen name="CreateProfile" component={CreateProfileScreen} />
            )}
            <AppStack.Screen name="Tabs" component={TabNavigator} />
            <AppStack.Screen name="Notifications" component={NotificationsScreen} />
            <AppStack.Screen name="CorporateInvitation" component={CorporateInvitationScreen} />
            <AppStack.Screen name="CreateBusinessCard" component={CreateBusinessCardNavigator} />
            <AppStack.Screen name="BusinessCard" component={BusinessCardScreen} />
            <AppStack.Screen name="ScanCardQRCode" component={ScanCardQRCodeScreen} />
            <AppStack.Screen name="AddContactManually" component={AddContactManuallyScreen} />
            <AppStack.Screen name="AddContactViaScanCard" component={AddContactViaScanCardScreen} />
            <AppStack.Screen name="CardEditor" component={CardEditorScreen} />
            <AppStack.Screen name="ColorPicker" component={ColorPickerScreen} />
            <AppStack.Screen name="SelectSocial" component={SelectSocialScreen} />
            <AppStack.Screen name="PreviewScreen" component={PreviewScreen} />
            <AppStack.Screen name="AddCardDetails" component={AddCardDetailsScreen} />
            <AppStack.Screen name="AddSocials" component={AddSocialsScreen} />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
