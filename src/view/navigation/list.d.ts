import { NavigatorScreenParams } from '@react-navigation/native';

import { CardDetails } from '~/models/businessCard';
import { CompanyModel } from '~/models/company';
import { DetailsSections } from '~/store/modules/cardForm/types';
import { ParseCardData } from '~/store/query/cards/types';
import { EmployeePermissionsType } from '~/store/query/cards/utils';
import { FileAsset } from '~/types';

import { CardType } from '../components/CreateCardButton/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface AuthParamList extends AuthStackParamList {}
    interface TabsParamList extends TabsStackParamList {}
    interface AccountParamList extends AccountStackParamList {}
    interface CreateBusinessCardParamList extends CreateBusinessCardStackParamList {}
    interface WalletParamList extends WalletStackParamList {}
  }
}

interface AddCardDetailsOptions {
  sectionType: DetailsSections;
  item: CardDetails;
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Tabs: NavigatorScreenParams<TabsStackParamList>;
  Notifications: undefined;
  CorporateInvitation: undefined;
  CreateBusinessCard: NavigatorScreenParams<CreateBusinessCardStackParamList>;
  BusinessCard: { id: number; cardType?: CardType };
  ScanCardQRCode: undefined;
  AddContactManually: { photo?: FileAsset; isScanCard?: boolean; cardDetails?: ParseCardData };
  AddContactViaScanCard: { photo: FileAsset };
  FirstPreview: { cardType?: CardType };
  CardEditor: { cardId?: number; cardPhoto?: FileAsset; cardType?: CardType } | undefined;
  ColorPicker: { title: string; initialColor: string; onSave: (color: string) => void };
  PreviewScreen: { cardType?: CardType; isManually?: boolean };
  AddCardDetails: {
    onSelect: (id: number, options: AddCardDetailsOptions) => void;
    employeePermissions?: EmployeePermissionsType[];
    fromWeb?: boolean;
  };
  AddSocials: {
    onSelect: (id: number, options: AddCardDetailsOptions) => void;
  };
  SelectSocial: { onSelect: (id: number) => void };
  CreateProfile: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ResetPassword: undefined;
};
export type HomeStackPatamList = {
  HomeScreen: undefined;
};
export type TabsStackParamList = {
  Wallet: NavigatorScreenParams<WalletStackParamList> | undefined;
  Home: NavigatorScreenParams<HomeStackPatamList> | undefined;
  Account: NavigatorScreenParams<AccountStackParamList> | undefined;
};

export type AccountStackParamList = {
  EditProfile: undefined;
  ChangePassword: undefined;
  InviteConnections: undefined;
  Account: undefined;
};

export type CreateBusinessCardStackParamList = {
  ChooseMethod: undefined;
  EnterEmail: undefined;
  FirstPreview: {
    email: string;
    verticalCompanyLogo: string | null;
    horizontalCompanyLogo: string | null;
    companyLogoColor: string;
    horizontalCardColor: string;
  };
};

export type WalletStackParamList = {
  ContactsInCompany: { company: CompanyModel };
  WalletScreen: undefined;
};
