import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useResetPasswordMutation } from '~/store/query/user';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';

import { ResetPasswordFormValues } from './types';

interface UseResetPasswordFormReturn {
  form: UseFormReturn<ResetPasswordFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ResetPasswordFormValues>>;
}

const defaultValues: ResetPasswordFormValues = {
  email: '',
};

const validation = yup.object({
  email: yup.string().required(formErrors.REQUIRED).email(formErrors.INVALID_EMAIL),
});

export function useResetPasswordForm(): UseResetPasswordFormReturn {
  const [resetPassword] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const handleSubmit = useCallback(
    async (values: ResetPasswordFormValues) => {
      try {
        await resetPassword({ email: values.email }).unwrap();
      } catch (e) {
        processApiError<ResetPasswordFormValues>({
          errors: getErrorData(e),
          fields: {
            email: 'email',
          },
          setFieldError: (name, error) => form.setError(name, { message: error }),
        });
      }
    },
    [form, resetPassword],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
