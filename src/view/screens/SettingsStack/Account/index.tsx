// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { Linking, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { PRIVACY_POLICY_URL } from '~/constants/external-link';
import { dispatch } from '~/store';
import { signOut } from '~/store/modules/user';
import { Delimiter } from '~/view/components/Delimiter';
import { SettingsHeader } from '~/view/components/Header/SettingsHeader';
import { MainContainer } from '~/view/components/MainContainer';
// import { SettingsStackParamList, TabsStackParamList } from '~/view/navigation/list';
import { makeStyles, Text, theme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

// type Props = CompositeScreenProps<
//   NativeStackScreenProps<ReactNavigation.RootParamList, 'Tabs'>,
//   CompositeScreenProps<
//     BottomTabScreenProps<TabsStackParamList>,
//     NativeStackScreenProps<SettingsStackParamList>
//   >
// >;
interface Props extends NativeStackScreenProps<ReactNavigation.AccountParamList, 'Account'> {}
export const AccountScreen: React.VFC<Props> = ({ navigation }) => {
  const styles = useStyles();

  const handleSignOutClick = () => {
    dispatch(signOut());
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };

  return (
    <MainContainer>
      <SettingsHeader title="Account" />
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.item} onPress={() => navigation.navigate('InviteConnections')}>
          <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
            Invite connections
          </Text>
        </Pressable>
        <Delimiter />
        <Pressable style={styles.item} onPress={() => navigation.navigate('EditProfile')}>
          <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
            Edit profile
          </Text>
        </Pressable>
        <Delimiter />
        <Pressable
          style={styles.item}
          // onPress={() => navigation.navigate('CorporateInvitation')}
        >
          <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD} color="gray1">
            Corporate card invitation
          </Text>
        </Pressable>
        <Delimiter />
        <Pressable style={styles.item} onPress={openPrivacyPolicy}>
          <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD}>
            Privacy Policy
          </Text>
        </Pressable>
        <Delimiter />
        <Pressable style={styles.item} onPress={handleSignOutClick}>
          <Text
            variant="p2"
            fontFamily={FontFamily.SEMI_BOLD}
            style={{ color: theme.colors.brand }}
          >
            Log Out
          </Text>
        </Pressable>
      </ScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: 6,
    paddingHorizontal: 25,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  disabledItem: {},
});
