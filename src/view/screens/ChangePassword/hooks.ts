import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useChangePasswordMutation } from '~/store/query/user';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';
import { ChangePasswordFormValues } from '~/view/screens/ChangePassword/types';

interface UseChangePasswordFormReturn {
  form: UseFormReturn<ChangePasswordFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ChangePasswordFormValues>>;
}

const defaultValues: ChangePasswordFormValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validation = yup.object({
  oldPassword: yup.string().required(formErrors.REQUIRED),
  newPassword: yup.string().required(formErrors.REQUIRED),
  confirmPassword: yup
    .string()
    .required(formErrors.REQUIRED)
    .test('passwordMismatch', formErrors.PASSWORD_MISMATCH, (value, { parent }) => {
      return parent.newPassword === value;
    }),
});

export function useChangePasswordForm(): UseChangePasswordFormReturn {
  const [changePassword] = useChangePasswordMutation();

  const form = useForm<ChangePasswordFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const handleSubmit = useCallback(
    async (values: ChangePasswordFormValues) => {
      try {
        await changePassword({
          old_password: values.oldPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        }).unwrap();
      } catch (e) {
        processApiError<ChangePasswordFormValues>({
          errors: getErrorData(e),
          fields: {
            old_password: 'oldPassword',
            new_password: 'newPassword',
            confirm_password: 'confirmPassword',
          },
          setFieldError: (name, error) => form.setError(name, { message: error }),
        });

        throw e;
      }
    },
    [changePassword, form],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
