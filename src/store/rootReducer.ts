import { isString } from '@appello/common/lib/utils/string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';

import { cardFormReducer } from '~/store/modules/cardForm';
import { signOut, userReducer } from '~/store/modules/user';
import { api } from '~/store/query/api';

const transforms = [
  createTransform(
    state => JSON.stringify(state),
    state =>
      JSON.parse(state, (key, value) =>
        isString(value) && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value)
          : value,
      ),
  ),
];

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  transforms,
};

const appReducer = combineReducers({
  user: userReducer,
  cardForm: cardFormReducer,
  [api.reducerPath]: api.reducer,
});

const reducer: typeof appReducer = (state, action) => {
  if (action.type === signOut.fulfilled.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const rootReducer = persistReducer<ReturnType<typeof reducer>>(rootPersistConfig, reducer);
