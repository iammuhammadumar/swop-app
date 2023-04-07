import { IS_IOS } from '@appello/mobile/lib/constants/platform';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { VFC } from 'react';
import { View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';

import {
  useSignInWithAppleMutation,
  useSignInWithFacebookMutation,
  useSignInWithGoogleMutation,
} from '~/store/query/user';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';
import { Button } from '~/view/components/Button';
import { SvgIcon } from '~/view/components/SvgIcon';
import { useAppleSignIn } from '~/view/hooks/useAppleSignIn';
import { useFacebookSignIn } from '~/view/hooks/useFacebookSignIn';
import { useGoogleSignIn } from '~/view/hooks/useGoogleSignIn';
import { makeStyles, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

export const SignInWith: VFC = () => {
  const styles = useStyles();

  const [signInWithGoogleMutation, { isLoading: isGoogleLoading }] = useSignInWithGoogleMutation();
  const [signInWithFacebookMutation, { isLoading: isFacebookLoading }] =
    useSignInWithFacebookMutation();
  const [signInWithAppleMutation, { isLoading: isAppleLoading }] = useSignInWithAppleMutation();

  const [signInWithGoogle] = useGoogleSignIn(async token => {
    try {
      await signInWithGoogleMutation({ access_token: token }).unwrap();
    } catch (e) {
      processApiError({ errors: getErrorData(e) });
      GoogleSignin.signOut();
    }
  });

  const [signInWithFacebook] = useFacebookSignIn(async token => {
    try {
      await signInWithFacebookMutation({ access_token: token }).unwrap();
    } catch (e) {
      processApiError({ errors: getErrorData(e) });
      LoginManager.logOut();
    }
  });

  const [signInWithApple] = useAppleSignIn(async token => {
    try {
      await signInWithAppleMutation({ access_token: token }).unwrap();
    } catch (e) {
      processApiError({ errors: getErrorData(e) });
      appleAuth.performRequest({ requestedOperation: appleAuth.Operation.LOGOUT });
    }
  });

  return (
    <View>
      <Button
        onPress={signInWithGoogle}
        containerStyle={styles.signInWithService}
        textStyle={styles.signInWithServiceText}
        label="Sign in with Google"
        isLoading={isGoogleLoading}
      >
        <SvgIcon name="google" size={24} style={styles.signInWithServiceIcon} />
      </Button>
      <Button
        onPress={signInWithFacebook}
        containerStyle={styles.signInWithService}
        textStyle={styles.signInWithServiceText}
        label="Sign in with Facebook"
        isLoading={isFacebookLoading}
      >
        <SvgIcon name="facebook" size={24} style={styles.signInWithServiceIcon} />
      </Button>
      {IS_IOS && (
        <Button
          onPress={signInWithApple}
          containerStyle={styles.signInWithService}
          textStyle={styles.signInWithServiceText}
          label="Sign in with Apple"
          isLoading={isAppleLoading}
        >
          <SvgIcon name="apple" size={24} style={styles.signInWithServiceIcon} />
        </Button>
      )}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    signInWithService: {
      borderRadius: theme.borderRadii.xs,
      backgroundColor: '#F0F2F4',
      marginTop: 8,
    },
    signInWithServiceIcon: {
      position: 'absolute',
      left: 12,
    },
    signInWithServiceText: {
      fontSize: theme.textSize.m,
      fontFamily: FontFamily.MEDIUM,
    },
  };
});
