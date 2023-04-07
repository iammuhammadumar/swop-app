import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useCallback } from 'react';

// todo: move this hook to @appello/mobile
export function useAppleSignIn(
  onSuccess: (token: string) => void | Promise<void>,
  onError?: (e: unknown) => void,
): [() => Promise<void>] {
  const signIn = useCallback(async () => {
    try {
      const { authorizationCode } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!authorizationCode) {
        throw new Error('{authorizationCode} is falsy in {useAppleSignIn}');
      }
      onSuccess(authorizationCode);
    } catch (e) {
      onError?.(e);
    }
  }, [onError, onSuccess]);

  return [signIn];
}
