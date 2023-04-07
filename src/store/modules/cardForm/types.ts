import { CardDetails, SocialLink } from '~/models/businessCard';
import { EmployeePermissionsType } from '~/store/query/cards/utils';
import { FileAsset } from '~/types';
import { CardType } from '~/view/components/CreateCardButton/types';

import { Accreditations, PersonalDetails } from '../../../models/businessCard';
import { CardView, IconsType } from './consts';

export interface CardFormState {
  form: CardFormValues;
  cardView: CardView;
  cardId: Nullable<number>;
  isCardPhoto: boolean;
}

export interface HorizontalViewFormValues {
  allow_change_profile_picture: boolean;
  horizontalCardColor: Nullable<string>;
  horizontalTextColor: string;
  horizontalCompanyLogo: Nullable<FileAsset | string>;
  horizontalProfilePhoto: Nullable<FileAsset | string>;
  horizontalIconColor: string;
  firstName: string;
  lastName: string;
  card_name: string;
  position: string;
  logoBackgroundColor: Nullable<string>;
  fromWeb: boolean;
}

export interface CardFormValues extends HorizontalViewFormValues {
  allow_change_vertical_profile_picture: boolean;
  allow_change_cover_photo: boolean;
  iconsType: IconsType;
  verticalLogo: string;
  photo: string;
  verticalPhoto: string;
  teamName: string;
  bio: string;
  phoneNumber: string;
  email: string;
  officeLocation: string;
  socials: SocialLink[];
  social_links: CardDetails[];
  personalDetails: PersonalDetails[];
  accreditations: Accreditations[];
  pictures: CardDetails[];
  verticalCompanyLogo: Nullable<FileAsset | string>;
  verticalProfilePhoto: Nullable<FileAsset | string>;
  verticalBlockColor: string;
  verticalBlockTextColor: string;
  verticalCircleColor: string;
  verticalCircleTextColor: string;
  card_name: string;
  position: string;
  companyName: string;
  company: string;
  department: string;
  team_name: string;
  cardType?: CardType;
  gender?: string;
  employeePermissions?: EmployeePermissionsType[];
}

export interface SocialInfoItem {
  id: number;
  name: string;
  logo: string;
}

export interface SocialGroupInfoItem {
  title: string;
  data: SocialInfoItem[];
}

export type DetailsSections = 'details' | 'personalDetails' | 'accreditations' | 'pictures';
