import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAppSelector } from '~/store/hooks';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { ProfileFormValues } from '~/view/components/ProfileForm';
import { ProfileForm } from '~/view/components/ProfileForm/ProfileForm';

export const EditProfileScreen: React.VFC = () => {
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
      <StackHeader text="Edit Profile" />
      <KeyboardAwareScrollView contentContainerStyle={{ paddingHorizontal: 25 }} enableOnAndroid>
        <ProfileForm defaultValues={defaultValues} />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};
