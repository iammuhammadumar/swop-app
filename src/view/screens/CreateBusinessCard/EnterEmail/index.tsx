import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { dispatch } from '~/store';
import { useAppSelector } from '~/store/hooks';
import { resetForm, updateForm } from '~/store/modules/cardForm';
import { getLogoFromBrandFetch } from '~/store/modules/cardForm/utils';
import { useLazyGetLogoBackgroundColorQuery } from '~/store/query/cards';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardType } from '~/view/components/CreateCardButton/types';
import { TextField } from '~/view/components/form/TextField';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text } from '~/view/plugins/theme';
import { theme } from '~/view/plugins/theme';

import { CardDataFromBrandRequest } from '../../../../store/modules/cardForm/utils';

export const EnterEmailScreen: React.VFC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const initialEmail = useAppSelector(state => state.cardForm.form.email);
  const [getLogoBackgroundColor] = useLazyGetLogoBackgroundColorQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validation = yup.object({
    email: yup.lazy((el: string) => {
      return el !== ''
        ? yup.string().required(formErrors.REQUIRED).email(formErrors.INVALID_EMAIL)
        : yup.string();
    }),
  });

  const form = useForm({
    mode: 'onChange',
    defaultValues: { email: initialEmail },
    resolver: yupResolver(validation),
  });
  const email = useWatch({
    control: form.control,
    name: 'email',
  });
  const handleSubmit = useMemo(() => {
    return form.handleSubmit(values => {
      if (values.email) {
        setIsLoading(true);
        const data = getLogoFromBrandFetch(values.email);
        data.then(async (data: CardDataFromBrandRequest) => {
          let logoColor = '';

          if (data.horizontalLogo && data.logoColorType !== 'light') {
            const { data: logoColorData } = await getLogoBackgroundColor(data.horizontalLogo);
            if (logoColorData) {
              logoColor = logoColorData;
            }
          } else if (data.horizontalLogo) {
            logoColor = theme.colors.gray4;
          }
          dispatch(
            updateForm({
              email: values.email,
              horizontalCompanyLogo: data.horizontalLogo || null,
              verticalCompanyLogo: data.verticalLogo || null,
              horizontalCardColor: data.cardColor,
              logoBackgroundColor: logoColor,
            }),
          );
          setIsLoading(false);
          navigation.navigate('CreateBusinessCard', {
            screen: 'FirstPreview',
            params: {
              email: values.email,
              verticalCompanyLogo: data.verticalLogo || null,
              horizontalCompanyLogo: data.horizontalLogo || null,
              horizontalCardColor: data.cardColor,
              companyLogoColor: logoColor || '',
            },
          });
        });
      } else {
        navigation.navigate('CardEditor', { cardType: CardType.BUSINESS });
      }
    });
  }, [form, getLogoBackgroundColor, navigation]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  return (
    <MainContainer>
      <StackHeader text="Create Business Card" />
      <View style={styles.container}>
        <Text variant="p2">
          To get started, enter your email to create your customised business card!
        </Text>
        <TextField
          name="email"
          control={form.control}
          label="Email"
          placeholder="john@workemail.com"
          style={styles.textField}
          autoComplete="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {email !== '' && (
          <Button
            styleType={ButtonStyleType.PRIMARY}
            label="Confirm"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        )}
        {email === '' && (
          <Button
            styleType={ButtonStyleType.SECONDARY}
            label="Continue without email"
            onPress={handleSubmit}
          />
        )}
      </View>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: 50,
    paddingHorizontal: 25,
  },
  textField: {
    marginTop: 28,
    marginBottom: 30,
  },
});
