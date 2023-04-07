import { useNavigation } from '@react-navigation/native';
import React, { VFC } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { Delimiter } from '~/view/components/Delimiter';
import { PasswordField } from '~/view/components/form/PasswordField';
import { TextField } from '~/view/components/form/TextField';
import { MainContainer } from '~/view/components/MainContainer';
import { SignInWith } from '~/view/components/SignInWith';
import { SvgIcon } from '~/view/components/SvgIcon';
import { TextLink } from '~/view/components/TextLink';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { useSignInForm } from '~/view/screens/SignIn/hooks';

export const SignInScreen: VFC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { form, handleSubmit } = useSignInForm();

  return (
    <MainContainer>
      <KeyboardAwareScrollView style={styles.wrapper} enableOnAndroid>
        <View style={styles.head}>
          <SvgIcon name="swopTextLogo" width={77} height={23} />
          <Text variant="h1" style={styles.title}>
            Log in to your account
          </Text>
        </View>
        <SignInWith />
        <Delimiter label="OR" containerStyle={styles.delimiter} />
        <TextField
          name="email"
          control={form.control}
          label="Email"
          style={styles.field}
          autoComplete="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <PasswordField
          name="password"
          control={form.control}
          label="Password"
          style={styles.field}
        />
        <TextLink
          text="Forgot password?"
          containerStyle={styles.forgotLink}
          onPress={() => navigation.navigate('Auth', { screen: 'ResetPassword' })}
        />
        <Button
          styleType={ButtonStyleType.PRIMARY}
          label="Log in"
          onPress={handleSubmit}
          isLoading={form.formState.isSubmitting}
          fullWidth
          containerStyle={styles.submitBtn}
        />
        <Text variant="p1" style={styles.signUpText}>
          Don’t have an account?{' '}
          <TextLink
            text="Sign Up"
            onPress={() => navigation.navigate('Auth', { screen: 'SignUp' })}
          />
        </Text>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    submitBtn: {
      marginTop: 30,
    },
    field: {
      marginBottom: 20,
    },
    wrapper: {
      marginTop: 50,
      paddingHorizontal: 25,
    },
    head: {
      alignItems: 'center',
      marginBottom: 28,
    },
    button: {
      backgroundColor: theme.colors.primary,
    },
    title: {
      marginTop: 60,
    },
    signUpText: {
      textAlign: 'center',
      marginTop: 30,
      lineHeight: 22,
    },
    forgotLink: {
      color: theme.colors.brand,
      fontSize: theme.textSize.l,
    },
    delimiter: {
      marginTop: 25,
      marginBottom: 15,
      paddingHorizontal: 25,
    },
  };
});
