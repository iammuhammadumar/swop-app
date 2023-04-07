import { IconsType } from '~/store/modules/cardForm/consts';
import { EmployeePermissionsType } from '~/store/query/cards/utils';
import { FileAsset } from '~/types';
import { CardType } from '~/view/components/CreateCardButton/types';

export interface SocialLink {
  socialId: number;
  value: string;
}

export interface PictureDetails {
  [x: string]: any;
  name: any;
  type: number;
  custom_name: null | string;
  value: string;
  file: FileAsset;
}
interface SocialType {
  id: number;
  name: string;
  logo: string;
  is_file?: boolean;
}
export interface CardDetails {
  id?: number;
  type: SocialType;
  custom_name?: string;
  value: string;
  file?: FileAsset | string;
  editable: boolean;
  latitude?: number;
  longitude?: number;
}

export interface PersonalDetails {
  name: string;
  value: string;
  editable: boolean;
}
export interface Accreditations {
  value: string;
}
export interface CardModel {
  id: number;
  fromWeb: boolean;
  employeePermissions?: EmployeePermissionsType[];
  allow_change_vertical_profile_picture: boolean;
  allow_change_profile_picture: boolean;
  allow_change_cover_photo: boolean;
  horizontalLogo: string;
  verticalBlockColor: string;
  verticalBlockTextColor: string;
  verticalPhoto: string;
  horizontalProfilePhoto?: string;
  horizontalCompanyLogo?: string;
  horizontalCardColor: string;
  horizontalIconColor: string;
  verticalLogo: string;
  horizontalTextColor: string;
  logoBackgroundColor: string;
  iconsType: IconsType;
  isCardPhoto: boolean;
  card_name: string;
  photo: string;
  firstName: string;
  lastName: string;
  inWallet: boolean;
  isOwner: boolean;
  phoneNumber: string;
  email: string;
  social_links: CardDetails[];
  officeLocation: string;
  personalDetails: PersonalDetails[];
  accreditations: Accreditations[];
  pictures?: CardDetails[];
  bio?: string;
  position?: string;
  teamName?: string;
  // team_name: string;
  company?: string;
  department?: string;
  isManually: boolean;
  verticalProfilePhoto?: string;
  verticalCompanyLogo?: string;
  cardType?: CardType;
}
