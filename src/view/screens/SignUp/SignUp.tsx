import { useNavigation } from '@react-navigation/native';
import React, { VFC } from 'react';
import { Linking, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PRIVACY_POLICY_URL } from '~/constants/external-link';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { Delimiter } from '~/view/components/Delimiter';
import { PasswordField } from '~/view/components/form/PasswordField';
import { TextField } from '~/view/components/form/TextField';
import { MainContainer } from '~/view/components/MainContainer';
import { SignInWith } from '~/view/components/SignInWith';
import { SvgIcon } from '~/view/components/SvgIcon';
import { TextLink } from '~/view/components/TextLink';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

import { useSignUpForm } from './hooks';

export const SignUpScreen: VFC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { form, handleSubmit } = useSignUpForm();

  const openPrivacyPolicy = () => {
    Linking.openURL(PRIVACY_POLICY_URL);
  };

  return (
    <MainContainer>
      <KeyboardAwareScrollView style={styles.wrapper} enableOnAndroid>
        <View style={styles.head}>
          <SvgIcon name="swopTextLogo" width={77} height={23} />
          <Text variant="h1" style={styles.title}>
            Create an account
          </Text>
        </View>
        <SignInWith />
        <Delimiter label="OR" containerStyle={styles.delimiter} />
        <TextField
          name="email"
          control={form.control}
          label="Enter your email"
          style={styles.field}
          autoComplete="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <PasswordField
          name="password"
          control={form.control}
          label="Choose a password"
          style={styles.field}
        />
        <Button
          styleType={ButtonStyleType.PRIMARY}
          label="Continue"
          onPress={handleSubmit}
          isLoading={form.formState.isSubmitting}
          fullWidth
          containerStyle={styles.submitBtn}
        />
        <Text variant="p1" style={styles.signUpText}>
          Already have an account?{' '}
          <TextLink
            text="Log in"
            onPress={() => navigation.navigate('Auth', { screen: 'SignIn' })}
          />
        </Text>
        <Text style={styles.tc}>
          By pressing next you are agreeing to our{' '}
          <Text style={styles.tcLink} onPress={openPrivacyPolicy}>
            Privacy Policy
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    tcLink: {
      textDecorationLine: 'underline',
    },
    tc: {
      color: theme.colors.gray1,
      textAlign: 'center',
      marginTop: 20,
      fontSize: 10,
      lineHeight: 16,
    },
    submitBtn: {
      marginTop: 10,
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
      marginBottom: 20,
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
    delimiter: {
      marginTop: 25,
      marginBottom: 15,
      paddingHorizontal: 25,
    },
  };
});
