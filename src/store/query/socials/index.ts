import { SocialGroupInfoItem, SocialInfoItem } from '~/store/modules/cardForm/types';
import { api } from '~/store/query/api';
import { groupBy } from '~/utils/groupBy';

export const socialsBuilder = api.injectEndpoints({
  endpoints: builder => ({
    getSocials: builder.query<Record<number, SocialInfoItem>, void>({
      query: () => ({
        url: '/glossary/social',
        method: 'GET',
      }),
      transformResponse(data: any[]) {
        return groupBy(data, item => item.id);
      },
    }),
    getSocialGroup: builder.query<SocialGroupInfoItem[], void>({
      query: () => ({
        url: '/glossary/social-group',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetSocialsQuery, useGetSocialGroupQuery } = socialsBuilder;
