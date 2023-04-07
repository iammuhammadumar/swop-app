import { createApi } from '@reduxjs/toolkit/query/react';

import { CacheTag } from '~/store/consts';

import { axiosBaseQuery } from './axiosBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  tagTypes: [CacheTag.CONTACT, CacheTag.CARD],
  endpoints: () => ({}),
});
