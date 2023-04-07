import { makeFormData } from '@appello/common/lib/utils';
import { isString } from '@appello/common/lib/utils/string';
import { ReactNativeFile } from '@appello/mobile/lib/classes/ReactNativeFile';

import { CardModel } from '~/models/businessCard';
import { CacheTag } from '~/store/consts';
import { api } from '~/store/query/api';
import { FileAsset } from '~/types';

import {
  CreateCardVariables,
  GetCardVariables,
  ParseCardData,
  ParseCardPhotoResponse,
  UpdateCardVariables,
} from './types';
import { createBusinessCardFromApi, mapCreateCardFields } from './utils';

export const cardsBuilder = api.injectEndpoints({
  endpoints: builder => ({
    getMyCards: builder.query<CardModel[], void>({
      query: () => ({
        url: '/cards/my?type__in=App,Web&personal=false',
        method: 'GET',
      }),
      transformResponse: (data: Record<string, any>[]) => data.map(createBusinessCardFromApi),
    }),
    getMyPersonalCards: builder.query<CardModel[], void>({
      query: () => ({
        url: `/cards/my`,
        method: 'GET',
        params: { type: 'App', personal: true },
      }),
      transformResponse: (data: Record<string, any>[]) => data.map(createBusinessCardFromApi),
    }),
    getCard: builder.query<CardModel, GetCardVariables>({
      query: ({ id }) => ({
        url: `/cards/${id}`,
        method: 'GET',
      }),
      transformResponse: createBusinessCardFromApi,
      providesTags: (result, error, { id }) => [{ type: CacheTag.CARD, id }],
    }),

    createCard: builder.mutation<string, CreateCardVariables>({
      query: ({ form, isManually, isCardPhoto, cardType }) => ({
        url: '/cards/my',
        method: 'POST',
        data: mapCreateCardFields(form, {
          type: isManually ? 'Manually' : 'App',
          business_design: {
            is_card_photo: isCardPhoto,
          },
          cardType,
        }),
      }),
      transformResponse: data => {
        return data.id;
      },
    }),
    updateCard: builder.mutation<void, UpdateCardVariables>({
      query: ({ form, cardId, cardType }) => ({
        url: `/cards/my/${cardId}`,
        method: 'PATCH',
        data: mapCreateCardFields(form, { cardType }),
      }),
      invalidatesTags: (result, error, { cardId }) => [{ type: CacheTag.CARD, id: cardId }],
    }),
    removeCard: builder.mutation<void, number>({
      query: cardId => ({
        url: `/cards/my/${cardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CacheTag.CARD, id }],
    }),
    getLogoBackgroundColor: builder.query<string, FileAsset | string>({
      query: data => ({
        url: '/cards/parser-logo',
        method: 'POST',
        data: makeFormData({
          logo: isString(data) ? data : null,
          file: !isString(data) ? new ReactNativeFile(data) : null,
        }),
      }),
      transformResponse: data => data.background_logo_colour,
    }),

    addCardToWallet: builder.mutation<void, { cardId: string }>({
      query: ({ cardId }) => {
        return {
          url: `/cards/${cardId}/export`,
          method: 'GET',
        };
      },
    }),

    parseCardPhoto: builder.query<ParseCardData, FileAsset>({
      query: data => ({
        url: '/cards/parser',
        method: 'POST',
        data: makeFormData({
          photo: new ReactNativeFile(data),
        }),
      }),
      transformResponse: (data: ParseCardPhotoResponse) => {
        const [firstName = null, lastName = null] = (data.Name || '').split(' ');
        return {
          firstName,
          lastName,
          email: data.Email,
          position: data.Job,
          website: data.Site,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddCardToWalletMutation,
  useGetMyCardsQuery,
  useGetMyPersonalCardsQuery,
  useGetCardQuery,
  useCreateCardMutation,
  useLazyGetLogoBackgroundColorQuery,
  useLazyParseCardPhotoQuery,
  useUpdateCardMutation,
  useRemoveCardMutation,
} = cardsBuilder;
