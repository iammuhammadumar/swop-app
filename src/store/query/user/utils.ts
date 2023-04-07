import { UserProfileModel } from '~/models/user';
import { AuthResponse } from '~/store/query/user/types';

export function createUserFromApi(data: any): UserProfileModel {
  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    photo: data.photo,
    isNew: data.is_newbie,
  };
}

export function createAuthResponse(data: any): AuthResponse {
  return {
    access: data.access,
    refresh: data.refresh,
    user: createUserFromApi(data.user),
  };
}
