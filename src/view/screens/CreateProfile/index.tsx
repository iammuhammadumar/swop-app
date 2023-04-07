import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAppSelector } from '~/store/hooks';
import { MainContainer } from '~/view/components/MainContainer';
import { ProfileFormValues } from '~/view/components/ProfileForm';
import { ProfileForm } from '~/view/components/ProfileForm/ProfileForm';
import { makeStyles, Text } from '~/view/plugins/theme';

export const CreateProfileScreen: React.VFC = () => {
  const styles = useStyles();

  const profile = useAppSelector(state => state.user.profile);

  const defaultValues: ProfileFormValues | undefined = React.useMemo(() => {
    if (!profile) {
      return undefined;
    }
    return {
      photo: profile.photo,
      firstName: profile.firstName,
      lastName: profile.lastName,
    };
  }, [profile]);

  return (
    <MainContainer>
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper} enableOnAndroid>
        <Text variant="h1" textAlign="center" style={styles.title}>
          Add your profile
        </Text>
        <Text textAlign="center">
          Please enter your profile details to setup an{'\n'} account in Swop
        </Text>
        <ProfileForm
          submitBtnText="Continue"
          defaultValues={defaultValues}
          withChangePassword={false}
        />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  title: {
    marginBottom: 10,
  },
  wrapper: {
    paddingTop: 80,
    paddingHorizontal: 25,
  },
});
