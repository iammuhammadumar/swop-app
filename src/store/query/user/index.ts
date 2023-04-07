import { makeFormData } from '@appello/common/lib/utils';
import { isString } from '@appello/common/lib/utils/string';
import { ReactNativeFile } from '@appello/mobile/lib/classes/ReactNativeFile';

import { UserProfileModel } from '~/models/user';
import { api } from '~/store/query/api';
import { createAuthResponse, createUserFromApi } from '~/store/query/user/utils';

import {
  AuthResponse,
  ChangePasswordVariables,
  EditProfileVariables,
  ResetPasswordVariables,
  SignInVariables,
  SignInWithMethodVariables,
  SignUpVariables,
} from './types';

export const userBuilder = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<AuthResponse, SignInVariables>({
      query: data => ({
        url: '/token',
        method: 'POST',
        data,
      }),
      transformResponse: createAuthResponse,
    }),
    signInWithGoogle: builder.mutation<AuthResponse, SignInWithMethodVariables>({
      query: data => ({
        url: '/token/google',
        method: 'POST',
        data,
      }),
      transformResponse: createAuthResponse,
    }),
    signInWithFacebook: builder.mutation<AuthResponse, SignInWithMethodVariables>({
      query: data => ({
        url: '/token/facebook',
        method: 'POST',
        data,
      }),
      transformResponse: createAuthResponse,
    }),
    signInWithApple: builder.mutation<AuthResponse, SignInWithMethodVariables>({
      query: data => ({
        url: '/token/apple',
        method: 'POST',
        data,
      }),
      transformResponse: createAuthResponse,
    }),
    signUp: builder.mutation<AuthResponse, SignUpVariables>({
      query: data => ({
        url: '/auth/register',
        method: 'POST',
        data,
      }),
      transformResponse: createAuthResponse,
    }),
    updateProfile: builder.mutation<UserProfileModel, EditProfileVariables>({
      query: data => {
        const formData = makeFormData({
          ...data,
          photo: data.photo && !isString(data.photo) ? new ReactNativeFile(data.photo) : null,
        });
        return {
          url: '/user',
          method: 'PATCH',
          data: formData,
        };
      },
      transformResponse: createUserFromApi,
    }),
    resetPassword: builder.mutation<undefined, ResetPasswordVariables>({
      query: data => ({
        url: '/password/reset-request',
        method: 'POST',
        data,
      }),
    }),
    changePassword: builder.mutation<undefined, ChangePasswordVariables>({
      query: data => ({
        url: '/password/change',
        method: 'POST',
        data,
      }),
    }),
    getUser: builder.query<UserProfileModel, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      transformResponse: createUserFromApi,
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignInWithGoogleMutation,
  useSignInWithFacebookMutation,
  useSignInWithAppleMutation,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLazyGetUserQuery,
} = userBuilder;
