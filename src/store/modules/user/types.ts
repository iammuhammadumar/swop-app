import { UserProfileModel } from '~/models/user';

export interface UserState {
  profile: Nullable<UserProfileModel>;
  auth: Nullable<UserAuth>;
}

export interface UserAuth {
  access: string;
  refresh: string;
}
