import { UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';

import { FileAsset } from '~/types';

export interface ProfileFormValues {
  photo: Nullable<FileAsset | string>;
  firstName: string;
  lastName: string;
}

export interface UseProfileFormProps {
  defaultValues?: ProfileFormValues;
}

export interface UseProfileFormReturn {
  form: UseFormReturn<ProfileFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProfileFormValues>>;
}
