import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { AvatarUpload } from '~/view/components/form/AvatarUpload';
import { TextField } from '~/view/components/form/TextField';
import { useProfileForm } from '~/view/components/ProfileForm/hooks';
import { ProfileFormValues } from '~/view/components/ProfileForm/types';
import { TextLink } from '~/view/components/TextLink';
import { makeStyles, useTheme } from '~/view/plugins/theme';

interface Props {
  submitBtnText?: string;
  defaultValues?: ProfileFormValues;
  withChangePassword?: boolean;
}

export const ProfileForm: React.VFC<Props> = ({
  submitBtnText = 'Save',
  defaultValues,
  withChangePassword = true,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { form, handleSubmit } = useProfileForm({ defaultValues });

  return (
    <View style={styles.container}>
      <AvatarUpload name="photo" control={form.control} />
      <TextField
        name="firstName"
        control={form.control}
        label="First name"
        style={styles.formField}
      />
      <TextField
        name="lastName"
        control={form.control}
        label="Last name"
        style={styles.formField}
      />
      {withChangePassword && (
        <TextLink
          text="Change password"
          containerStyle={styles.textLink}
          onPress={() =>
            navigation.navigate('Tabs', {
              screen: 'Account',
              params: { screen: 'ChangePassword' },
            })
          }
        />
      )}
      <Button
        containerStyle={!withChangePassword && styles.withoutChangePasswordBtn}
        styleType={ButtonStyleType.PRIMARY}
        label={submitBtnText}
        onPress={handleSubmit}
        isLoading={form.formState.isSubmitting}
      />
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    withoutChangePasswordBtn: {
      marginTop: 30,
    },
    container: {
      marginTop: 35,
    },
    formField: {
      marginTop: 25,
    },
    textLink: {
      marginTop: 20,
      marginBottom: 30,
      color: theme.colors.brand,
      fontSize: 16,
    },
  };
});
