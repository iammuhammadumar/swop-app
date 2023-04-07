import { api } from '~/store/query/api';

import { InviteConnectionVariables } from './types';

export const inviteConnectionsBuilder = api.injectEndpoints({
  endpoints: builder => ({
    inviteConnection: builder.mutation<undefined, InviteConnectionVariables>({
      query: data => ({
        url: '/sms-invite',
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useInviteConnectionMutation } = inviteConnectionsBuilder;
