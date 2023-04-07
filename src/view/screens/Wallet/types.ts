import { ReactElement } from 'react';

export enum WalletOption {
  CONTACTS,
  COMPANIES,
}

// removed for MVP
export enum WalletTypeSortOption {
  BUSINESS = 'Business wallet',
  SOCIAL = 'Social wallet',
  PERSONAL = 'Personal wallet',
}

// removed for MVP
export enum BasicSortOption {
  FIRST_NAME_A_Z = 'First name (a-z)',
  LAST_NAME_A_Z = 'Last name (a-z)',
  RECENTLY_CONNECTED = 'Recently connected',
}

// removed for MVP
export interface AddMenuOption {
  label: string;
  icon: ReactElement;
  onPress: () => void;
}

export interface AddContactModalRef {
  open(): void;
  close(): void;
}
