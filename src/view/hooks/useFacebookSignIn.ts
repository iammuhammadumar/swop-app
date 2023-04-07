import { useCallback } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

// todo: move this hook to @appello/mobile
export function useFacebookSignIn(
  onSuccess: (token: string) => void | Promise<void>,
  onError?: (e: unknown) => void,
): [() => Promise<void>] {
  const signIn = useCallback(async () => {
    try {
      const { isCancelled } = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (isCancelled) {
        throw new Error('Facebook sign in cancelled');
      }
      const accessToken = await AccessToken.getCurrentAccessToken();
      if (!accessToken) {
        throw new Error(`{accessToken} is falsy`);
      }
      onSuccess(accessToken.accessToken);
    } catch (e) {
      onError?.(e);
    }
  }, [onError, onSuccess]);

  return [signIn];
}
