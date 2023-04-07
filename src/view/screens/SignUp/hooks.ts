import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useSignUpMutation } from '~/store/query/user';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';
import { SignInFormValues } from '~/view/screens/SignIn/types';

import { SignUpFormValues } from './types';

interface UseSignUpFormReturn {
  form: UseFormReturn<SignUpFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignUpFormValues>>;
}

const defaultValues: SignUpFormValues = {
  email: '',
  password: '',
};

const validation = yup.object({
  email: yup.string().required(formErrors.REQUIRED).email(formErrors.INVALID_EMAIL),
  password: yup.string().required(formErrors.REQUIRED),
});

export function useSignUpForm(): UseSignUpFormReturn {
  const [signUp] = useSignUpMutation();

  const form = useForm<SignUpFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const handleSubmit = useCallback(
    async (values: SignUpFormValues) => {
      try {
        await signUp({
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
    [form, signUp],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
