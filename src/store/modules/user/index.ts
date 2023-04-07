import { IS_IOS } from '@appello/mobile/lib/constants/platform';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginManager } from 'react-native-fbsdk-next';

import { UserProfileModel } from '~/models/user';
import { userBuilder } from '~/store/query/user';
import { AuthResponse } from '~/store/query/user/types';

import { UserAuth, UserState } from './types';

export const initialState: UserState = {
  profile: null,
  auth: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Nullable<UserAuth>>) {
      state.auth = action.payload;
    },
    setUser(state, action: PayloadAction<Nullable<UserProfileModel>>) {
      state.profile = action.payload;
    },
  },
  extraReducers(builder) {
    [
      userBuilder.endpoints.signIn.matchFulfilled,
      userBuilder.endpoints.signUp.matchFulfilled,
      userBuilder.endpoints.signInWithApple.matchFulfilled,
      userBuilder.endpoints.signInWithGoogle.matchFulfilled,
      userBuilder.endpoints.signInWithFacebook.matchFulfilled,
    ].forEach(action => {
      builder.addMatcher(action, (state, { payload }: PayloadAction<AuthResponse>) => {
        state.profile = payload.user;
        state.auth = {
          refresh: payload.refresh,
          access: payload.access,
        };
      });
    });
    builder.addMatcher(userBuilder.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.profile = payload;
    });
  },
});

export const signOut = createAsyncThunk('user/signOut', async () => {
  GoogleSignin.signOut();
  LoginManager.logOut();
  if (IS_IOS) {
    appleAuth.performRequest({ requestedOperation: appleAuth.Operation.LOGOUT });
  }
});

export const userReducer = userSlice.reducer;
export const { setAuth, setUser } = userSlice.actions;
