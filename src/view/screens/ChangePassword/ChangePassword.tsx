import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { PasswordField } from '~/view/components/form/PasswordField';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { SuccessMessage } from '~/view/components/SuccessMessage';
import { makeStyles, Text } from '~/view/plugins/theme';
import { useChangePasswordForm } from '~/view/screens/ChangePassword/hooks';

export const ChangePasswordScreen: React.VFC = () => {
  const { form, handleSubmit } = useChangePasswordForm();
  const { isSubmitSuccessful } = form.formState;
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <MainContainer>
      <StackHeader />
      {isSubmitSuccessful && (
        <SuccessMessage
          heading="Password changed successfully!"
          text={`Success! New password was set to your Swop\n account! Update your password regulary to\n keep it secure.`}
          onPress={() => navigation.goBack()}
          containerStyle={styles.successMessage}
        />
      )}
      {!isSubmitSuccessful && (
        <View style={styles.container}>
          <Text variant="h1" style={styles.heading}>
            Create new password
          </Text>
          <PasswordField
            name="oldPassword"
            control={form.control}
            label="Current Password"
            style={styles.formField}
          />
          <PasswordField
            name="newPassword"
            control={form.control}
            label="New Password"
            style={styles.formField}
          />
          <PasswordField
            name="confirmPassword"
            control={form.control}
            label="Repeat New Password"
            style={styles.formField}
          />
          <Button
            styleType={ButtonStyleType.PRIMARY}
            label="Confirm"
            containerStyle={styles.btn}
            onPress={handleSubmit}
            isLoading={form.formState.isSubmitting}
          />
        </View>
      )}
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    paddingHorizontal: 25,
  },
  heading: {
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 48,
  },
  formField: {
    marginTop: 15,
  },
  btn: {
    marginTop: 30,
  },
  successMessage: {
    marginTop: 60,
  },
});
