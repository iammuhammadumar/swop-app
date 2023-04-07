import { pick } from '@appello/common/lib/utils/object';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useAppSelector } from '~/store/hooks';
import { changeCardView, updateForm } from '~/store/modules/cardForm';
import { CardView } from '~/store/modules/cardForm/consts';
import { HorizontalViewFormValues } from '~/store/modules/cardForm/types';
import { isExternalLogo } from '~/store/modules/cardForm/utils';
import { useLazyGetLogoBackgroundColorQuery } from '~/store/query/cards';
import { FileAsset } from '~/types';
import { useTheme } from '~/view/plugins/theme';

interface UseHorizontalViewFormReturn {
  form: UseFormReturn<HorizontalViewFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<HorizontalViewFormValues>>;
}

const validation = yup.object({
  firstName: yup.string().required(formErrors.REQUIRED),
  lastName: yup.string().required(formErrors.REQUIRED),
});

export function useHorizontalViewForm(): UseHorizontalViewFormReturn {
  const theme = useTheme();
  const dispatch = useDispatch();
  const savedForm = useAppSelector(state => state.cardForm.form);
  const profile = useAppSelector(state => state.user.profile);

  const form = useForm<HorizontalViewFormValues>({
    mode: 'onChange',
    defaultValues: {
      horizontalCardColor: savedForm.horizontalCardColor || theme.colors.brand,
      horizontalTextColor: savedForm.horizontalTextColor || theme.colors.white,
      horizontalCompanyLogo: savedForm.horizontalCompanyLogo ?? null,
      firstName: savedForm.firstName || profile?.firstName || '',
      lastName: savedForm.lastName || profile?.lastName || '',
      card_name: savedForm.card_name || '',
      allow_change_profile_picture: savedForm.allow_change_profile_picture,
      fromWeb: savedForm.fromWeb,
      position:
        savedForm.position ||
        savedForm.personalDetails.find(item => item.name === 'position' || item.name === 'Position')
          ?.value,
      ...pick(savedForm, [
        'horizontalProfilePhoto',
        // 'position',
        'companyName',
        'logoBackgroundColor',
      ]),
    },
    resolver: yupResolver(validation),
  });

  const handleSubmit = (values: HorizontalViewFormValues): void => {
    dispatch(updateForm(values));
    dispatch(changeCardView(CardView.VERTICAL));
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}

interface UseLogoBackgroundColorReturn {
  isLoading: boolean;
}

export function useLogoBackgroundColor(
  logo: Nullable<string | FileAsset> | string,
  onSuccess: (color: Nullable<string>) => void,
): UseLogoBackgroundColorReturn {
  const [getLogoBackgroundColor, { isLoading }] = useLazyGetLogoBackgroundColorQuery();

  useEffect(() => {
    (async () => {
      if (logo && (typeof logo !== 'string' || isExternalLogo(logo))) {
        try {
          const { data } = await getLogoBackgroundColor(logo);
          onSuccess(data ?? null);
        } catch (e) {
          onSuccess(null);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo]);

  return useMemo(() => ({ isLoading }), [isLoading]);
}
