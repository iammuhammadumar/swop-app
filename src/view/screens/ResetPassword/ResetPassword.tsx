import { useNavigation } from '@react-navigation/native';
import React, { useMemo, VFC } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { TextField } from '~/view/components/form/TextField';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { SuccessMessage } from '~/view/components/SuccessMessage';
import { makeStyles, Text } from '~/view/plugins/theme';
import { useResetPasswordForm } from '~/view/screens/ResetPassword/hooks';

export const ResetPasswordScreen: VFC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { form, handleSubmit } = useResetPasswordForm();
  const { isSubmitSuccessful } = form.formState;

  const sentEmail = useMemo(() => {
    return isSubmitSuccessful ? form.getValues('email') : '';
  }, [isSubmitSuccessful, form]);

  return (
    <MainContainer>
      <StackHeader />
      <KeyboardAwareScrollView style={styles.wrapper} enableOnAndroid>
        {!isSubmitSuccessful && (
          <>
            <Text variant="h1" textAlign="center" style={styles.title}>
              Reset password
            </Text>
            <Text variant="p2" textAlign="center" style={styles.description}>
              Please enter your email address to reset{'\n'}password details
            </Text>
            <TextField
              name="email"
              control={form.control}
              label="Email"
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button
              styleType={ButtonStyleType.PRIMARY}
              label="Continue"
              onPress={handleSubmit}
              isLoading={form.formState.isSubmitting}
              fullWidth
              containerStyle={styles.submitBtn}
            />
          </>
        )}
        {isSubmitSuccessful && (
          <SuccessMessage
            heading="Reset password"
            text={`Success! New password was sent to\n${sentEmail} please check your inbox.`}
            onPress={navigation.goBack}
          />
        )}
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  description: {
    marginBottom: 28,
  },
  title: {
    marginBottom: 10,
  },
  submitBtn: {
    marginTop: 30,
  },
  wrapper: {
    paddingTop: 80,
    paddingHorizontal: 25,
  },
});
