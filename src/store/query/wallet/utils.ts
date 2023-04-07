import { CompanyModel } from '~/models/company';
import { ContactsFilter } from '~/view/screens/Wallet/components/consts';

export function createCompanyFromApi(data: Record<string, any>): CompanyModel {
  return {
    id: data.id,
    name: data.company,
    contactsCount: data.count,
  };
}
interface SetFilter {
  personal?: boolean;
}
export const setFilter = (filter: ContactsFilter): SetFilter => {
  if (filter === ContactsFilter.ALL) {
    return {};
  }
  if (filter === ContactsFilter.PERSONAL) {
    return { personal: true };
  }
  if (filter === ContactsFilter.BUSINESS) {
    return { personal: false };
  }
  return {};
};
