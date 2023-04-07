import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { setUser } from '~/store/modules/user';
import { useUpdateProfileMutation } from '~/store/query/user';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';

import { ProfileFormValues, UseProfileFormProps, UseProfileFormReturn } from './types';

const initialValues: ProfileFormValues = {
  photo: null,
  firstName: '',
  lastName: '',
};

const validation = yup.object({
  firstName: yup.string().required(formErrors.REQUIRED),
  lastName: yup.string().required(formErrors.REQUIRED),
});

export function useProfileForm({
  defaultValues = initialValues,
}: UseProfileFormProps): UseProfileFormReturn {
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const form = useForm<ProfileFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const handleSubmit = useCallback(
    async (values: ProfileFormValues) => {
      try {
        const user = await updateProfile({
          photo: typeof values.photo !== 'string' ? values.photo : undefined,
          first_name: values.firstName,
          last_name: values.lastName,
        }).unwrap();

        dispatch(setUser(user));

        showMessage({
          message: 'Profile has been updated',
          type: 'success',
        });
      } catch (e) {
        processApiError<ProfileFormValues>({
          errors: getErrorData(e),
          fields: {
            photo: 'photo',
            first_name: 'firstName',
            last_name: 'lastName',
          },
          setFieldError: (name, error) => form.setError(name, { message: error }),
        });
      }
    },
    [dispatch, form, updateProfile],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
