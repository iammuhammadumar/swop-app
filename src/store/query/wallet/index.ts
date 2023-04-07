import { handleRequestError } from '@appello/common/lib/utils';
import { AxiosError } from 'axios';
import { parseUrl } from 'query-string';
import { useInfiniteQuery } from 'react-query';
import { UseInfiniteQueryResult } from 'react-query/types/react/types';
import toSnakeCase from 'snakecase-keys';

import { QueryKey } from '~/constants/query';
import { CardModel } from '~/models/businessCard';
import { CompanyModel } from '~/models/company';
import { Api } from '~/services/Api';
import { api } from '~/store/query/api';
import { createBusinessCardFromApi } from '~/store/query/cards/utils';
import { createCompanyFromApi, setFilter } from '~/store/query/wallet/utils';
import { ContactsFilter, ContactsSort } from '~/view/screens/Wallet/components/consts';

import { SaveContactVariables } from './types';

export const walletBuilder = api.injectEndpoints({
  endpoints: builder => ({
    saveContact: builder.mutation<undefined, SaveContactVariables>({
      query: data => ({
        url: '/wallet/add',
        method: 'POST',
        data: toSnakeCase(data),
      }),
    }),
    removeContact: builder.mutation<void, number>({
      query: cardId => ({
        url: `/wallet/${cardId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSaveContactMutation, useRemoveContactMutation } = walletBuilder;

interface UseInfiniteGetContactsQueryProps {
  companyName?: string;
  limit?: number;
  sort?: ContactsSort;
  filter?: ContactsFilter;
  search?: string;
}

// replace by rtk infinite query implementation when it will be released
export function useInfiniteGetContactsQuery({
  companyName,
  limit,
  sort,
  filter,
  search,
}: UseInfiniteGetContactsQueryProps = {}): UseInfiniteQueryResult<{
  next: Nullable<string>;
  prev: Nullable<string>;
  list: CardModel[];
  totalCount: number;
}> {
  return useInfiniteQuery(
    [QueryKey.CONTACTS, companyName, sort, filter, search],
    async ({ pageParam = 0 }) => {
      try {
        const { data } = await Api.request<any>({
          url: '/wallet',
          method: 'GET',
          params: {
            limit,
            offset: pageParam,
            company: companyName,
            ...setFilter(filter || ContactsFilter.ALL),
            ordering: sort,
            search: search || undefined,
          },
        });
        return {
          next: data.next,
          prev: data.previous,
          list: (data.results as any[]).map(data =>
            createBusinessCardFromApi({ ...data, in_wallet: true }),
          ),
          totalCount: data.count,
        };
      } catch (e) {
        const error = e as AxiosError;
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          error: {
            status: error.response?.status,
            data: handleRequestError(error),
          },
        });
      }
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.next ? Number(parseUrl(lastPage.next).query.offset) : false;
      },
      getPreviousPageParam(lastPage) {
        return lastPage.prev ? Number(parseUrl(lastPage.prev).query.offset) : false;
      },
    },
  );
}

interface UseInfiniteGetCompaniesQueryProps {
  limit?: number;
  search?: string;
}

// replace by rtk infinite query implementation when it will be released
export function useInfiniteGetCompaniesQuery({
  limit,
  search,
}: UseInfiniteGetCompaniesQueryProps = {}): UseInfiniteQueryResult<{
  next: Nullable<string>;
  prev: Nullable<string>;
  list: CompanyModel[];
  totalCount: number;
}> {
  return useInfiniteQuery(
    [QueryKey.COMPANIES, search],
    async ({ pageParam = 0 }) => {
      try {
        const { data } = await Api.request<any>({
          url: '/wallet/company',
          method: 'GET',
          params: {
            limit,
            offset: pageParam,
            search: search || undefined,
          },
        });
        return {
          next: data.next,
          prev: data.previous,
          list: (data.results as any[]).map(data =>
            createCompanyFromApi({ ...data, in_wallet: true }),
          ),
          totalCount: data.count,
        };
      } catch (e) {
        const error = e as AxiosError;
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          error: {
            status: error.response?.status,
            data: handleRequestError(error),
          },
        });
      }
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.next ? Number(parseUrl(lastPage.next).query.offset) : false;
      },
      getPreviousPageParam(lastPage) {
        return lastPage.prev ? Number(parseUrl(lastPage.prev).query.offset) : false;
      },
    },
  );
}
