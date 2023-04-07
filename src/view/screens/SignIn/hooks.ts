import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useSignInMutation } from '~/store/query/user';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';
import { SignInFormValues } from '~/view/screens/SignIn/types';

interface UseSignInFormReturn {
  form: UseFormReturn<SignInFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignInFormValues>>;
}

const defaultValues: SignInFormValues = {
  email: '',
  password: '',
};

const validation = yup.object({
  email: yup.string().required(formErrors.REQUIRED).email(formErrors.INVALID_EMAIL),
  password: yup.string().required(formErrors.REQUIRED),
});

export function useSignInForm(): UseSignInFormReturn {
  const [signIn] = useSignInMutation();

  const form = useForm<SignInFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const handleSubmit = useCallback(
    async (values: SignInFormValues) => {
      try {
        await signIn({
          email: values.email,
          password: values.password,
        }).unwrap();
      } catch (e) {
        processApiError<SignInFormValues>({
          errors: getErrorData(e),
          fields: {
            email: 'email',
            password: 'password',
          },
          setFieldError: (name, error) => form.setError(name, { message: error }),
        });
      }
    },
    [form, signIn],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
