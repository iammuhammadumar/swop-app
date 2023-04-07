import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useAppSelector } from '~/store/hooks';
import { CardFormValues } from '~/store/modules/cardForm/types';
import { ParseCardData } from '~/store/query/cards/types';
import { useTheme } from '~/view/plugins/theme';

interface UseAddContactManuallyFormReturn {
  form: UseFormReturn<CardFormValues>;
}

const validation = yup.object({
  firstName: yup.string().required(formErrors.REQUIRED),
  lastName: yup.string().required(formErrors.REQUIRED),
});

export function useAddContactManuallyForm(
  cardDetails?: ParseCardData,
): UseAddContactManuallyFormReturn {
  const theme = useTheme();
  const savedForm = useAppSelector(state => state.cardForm.form);

  const personalDetails = [
    { name: 'Position', value: cardDetails?.position || '' },
    { name: 'Company', value: '' },
    { name: 'Team Name', value: '' },
  ];
  const sociaLinks = [
    { type: undefined, custom_name: 'Email', value: cardDetails?.email || '' },
    { type: undefined, custom_name: 'Phone', value: '' },
    { type: undefined, custom_name: 'Address', value: '' },
  ];

  const form = useForm<CardFormValues>({
    mode: 'onChange',
    defaultValues: {
      ...savedForm,
      personalDetails,
      social_links: sociaLinks,
      firstName: cardDetails?.firstName || '',
      lastName: cardDetails?.lastName || '',
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
