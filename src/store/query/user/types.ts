import { UserProfileModel } from '~/models/user';
import { UserAuth } from '~/store/modules/user/types';
import { FileAsset } from '~/types';

export interface SignInVariables {
  email: string;
  password: string;
}

export interface SignInWithMethodVariables {
  access_token: string;
}

export interface AuthResponse extends UserAuth {
  user: UserProfileModel;
}

export interface SignUpVariables extends SignInVariables {}

export interface ResetPasswordVariables {
  email: string;
}

export interface ChangePasswordVariables {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface EditProfileVariables {
  photo?: Nullable<FileAsset | string>;
  first_name?: string;
  last_name?: string;
}
