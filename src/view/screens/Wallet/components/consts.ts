export const CONTACTS_PAGE_LIMIT = 4;
export const COMPANIES_PAGE_LIMIT = 10;

export enum ContactsSort {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  RECENTLY_CONNECTED = '-recently_connected',
}
export enum ContactsFilter {
  ALL = 'all',
  BUSINESS = 'business',
  PERSONAL = 'personal',
}
