import { yupResolver } from '@hookform/resolvers/yup';
// import { PhoneNumberUtil } from 'google-libphonenumber';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useAppSelector } from '~/store/hooks';
import { CardFormValues } from '~/store/modules/cardForm/types';
import { useTheme } from '~/view/plugins/theme';

interface UseVerticalViewFormReturn {
  form: UseFormReturn<CardFormValues>;
}

// const phoneNumberUtil = PhoneNumberUtil.getInstance();
const accreditationsValidation = yup.object().shape({
  value: yup.string().required(formErrors.REQUIRED),
});
const personalDetailsValidation = yup.object().shape({
  value: yup.string().required(formErrors.REQUIRED),
});
const picturesValidation = yup.object().shape({
  custom_name: yup.string().required(formErrors.REQUIRED),
});
const validation = yup.object({
  firstName: yup.string().required(formErrors.REQUIRED),
  lastName: yup.string().required(formErrors.REQUIRED),
  accreditations: yup.array().of(accreditationsValidation),
  personalDetails: yup.array().of(personalDetailsValidation),
  social_links: yup.array().of(
    yup.object().shape({
      custom_name: yup.string().required(formErrors.REQUIRED),
      value: yup.mixed().when('type', (type, schma) => {
        schma = yup.string().required(formErrors.REQUIRED);
        if (type.name === 'Phone') {
          schma = yup
            .number()
            .transform(value => (!value ? undefined : value))
            // .integer()
            // .positive()
            .required(formErrors.INVALID_PHONE_NUMBER);
          // yup.number().required('This field is requried').positive().integer();

          // .test('invalidPhoneNumber', formErrors.INVALID_PHONE_NUMBER, value => {
          //   if (!value || !/^\+\d+$/.test(value)) {
          //     return false;
          //   }
          //   try {
          //     const phone = phoneNumberUtil.parse(value);
          //     return phoneNumberUtil.isValidNumber(phone);
          //   } catch (e) {
          //     return false;
          //   }
          // });
        } else if (type.name === 'Email') {
          schma = yup.string().required(formErrors.REQUIRED).email(formErrors.INVALID_EMAIL);
        } else if (type?.name !== 'Address') {
          schma = yup
            .string()
            .required(formErrors.REQUIRED)
            .matches(
              /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              formErrors.INVALID_URL,
            )
            .required(formErrors.INVALID_WEBSITE);
        }
        return schma;
      }),
    }),
  ),
  pictures: yup.array().of(picturesValidation),
  // position: yup.string().required(formErrors.REQUIRED),
  // companyName: yup.string().required(formErrors.REQUIRED),
  // teamName: yup.string(),
  // bio: yup.string(),
  // phoneNumber: yup
  //   .string()
  //   .required(formErrors.REQUIRED)
  //   .test('invalidPhoneNumber', formErrors.INVALID_PHONE_NUMBER, value => {
  //     if (!value || !/^\+\d+$/.test(value)) {
  //       return false;
  //     }
  //     try {
  //       const phone = phoneNumberUtil.parse(value);
  //       return phoneNumberUtil.isValidNumber(phone);
  //     } catch (e) {
  //       return false;
  //     }
  //   }),
  // email: yup.string().required(formErrors.REQUIRED).email(formErrors.INVALID_EMAIL),
  // officeLocation: yup.string().required(formErrors.REQUIRED),
  // social: yup.array().of(
  //   yup.object({
  //     value: yup.string().required(formErrors.REQUIRED),
  //   }),
  // ),
});

export function useVerticalViewForm(): UseVerticalViewFormReturn {
  const theme = useTheme();
  const savedForm = useAppSelector(state => state.cardForm.form);
  const form = useForm<CardFormValues>({
    mode: 'onChange',
    defaultValues: {
      ...savedForm,
      horizontalIconColor: savedForm.horizontalIconColor || theme.colors.brandSecondary,
      horizontalCardColor: savedForm.horizontalCardColor || theme.colors.brandSecondary,
      horizontalTextColor: savedForm.horizontalTextColor || theme.colors.white,
      verticalCircleColor: savedForm.verticalCircleColor || theme.colors.brandSecondary,
      verticalCircleTextColor: savedForm.verticalCircleTextColor || theme.colors.ink,
      verticalBlockColor: savedForm.verticalBlockColor || theme.colors.brand,
      verticalBlockTextColor: savedForm.verticalBlockTextColor || theme.colors.white,
      verticalCompanyLogo: savedForm.verticalCompanyLogo,
      verticalProfilePhoto: savedForm.verticalProfilePhoto,
    },
    resolver: yupResolver(validation),
  });

  return { form };
}
