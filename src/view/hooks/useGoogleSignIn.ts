import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useCallback } from 'react';
import { Platform } from 'react-native';

import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '~/constants/env';

GoogleSignin.configure({
  iosClientId: Platform.OS === 'ios' ? GOOGLE_IOS_CLIENT_ID : GOOGLE_ANDROID_CLIENT_ID,
});

// todo: move this hook to @appello/mobile
export function useGoogleSignIn(
  onSuccess: (token: string) => void | Promise<void>,
  onError?: (e: unknown) => void,
): [() => Promise<void>] {
  const signIn = useCallback(async () => {
    try {
      await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      onSuccess(accessToken);
    } catch (e) {
      onError?.(e);
    }
  }, [onError, onSuccess]);

  return [signIn];
}
