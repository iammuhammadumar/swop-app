import { useMountEffect } from '@appello/common/lib/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { dispatch } from '~/store';
import { useAppSelector } from '~/store/hooks';
import {
  changeCardView,
  resetForm,
  setCardId,
  setIsCardPhoto,
  updateForm,
} from '~/store/modules/cardForm';
import { CardView } from '~/store/modules/cardForm/consts';
import { CardFormValues } from '~/store/modules/cardForm/types';
import {
  useGetCardQuery,
  useLazyParseCardPhotoQuery,
  useRemoveCardMutation,
} from '~/store/query/cards';
import { useRemoveContactMutation } from '~/store/query/wallet';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';

import { CardFillProgress } from './components/CardFillProgress';
import { CreateVerticalViewForm } from './components/CreateVerticalViewForm';
import { HorizontalViewForm } from './components/HorizontalViewForm';

type Props = NativeStackScreenProps<ReactNavigation.RootParamList, 'CardEditor'>;

export const CardEditorScreen: React.VFC<Props> = ({ route }) => {
  const { cardId, cardPhoto, cardType } = route.params ?? {};
  const navigation = useNavigation();
  const cardView = useAppSelector(state => state.cardForm.cardView);
  const { data } = useGetCardQuery({ id: Number(cardId) }, { skip: !cardId });
  const [removeCard] = useRemoveCardMutation();
  const [removeContact] = useRemoveContactMutation();
  const [parseCardPhoto] = useLazyParseCardPhotoQuery();
  const [initialized, setInitialized] = useState(!cardId && !cardPhoto);

  useMountEffect(() => {
    if (!cardPhoto) {
      return;
    }

    dispatch(setIsCardPhoto(true));

    dispatch(
      updateForm({
        verticalProfilePhoto: cardPhoto,
        horizontalProfilePhoto: cardPhoto,
      }),
    );

    const effect = async () => {
      const { data } = await parseCardPhoto(cardPhoto);

      if (!data) {
        return;
      }

      const parsedFields: Partial<
        Pick<CardFormValues, 'email' | 'phoneNumber' | 'firstName' | 'lastName' | 'position'>
      > = {};

      (['email', 'firstName', 'lastName', 'position'] as const).forEach(field => {
        const value = data[field];
        if (value) {
          parsedFields[field] = value;
        }
      });

      dispatch(updateForm(parsedFields));
    };

    effect().finally(() => setInitialized(true));
  });

  useMountEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  });

  useEffect(() => {
    if (data) {
      if (data.id) {
        dispatch(setCardId(data.id));
      }
      dispatch(
        updateForm({
          allow_change_vertical_profile_picture: data.allow_change_vertical_profile_picture,
          allow_change_profile_picture: data.allow_change_profile_picture,
          allow_change_cover_photo: data.allow_change_cover_photo,
          fromWeb: data.fromWeb,
          horizontalCardColor: data.horizontalCardColor,
          horizontalTextColor: data.horizontalTextColor,
          horizontalCompanyLogo: data.horizontalLogo,
          horizontalProfilePhoto: data.photo,
          horizontalIconColor: data.horizontalIconColor,
          verticalCompanyLogo: data.verticalLogo,
          verticalProfilePhoto: data.verticalPhoto,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          officeLocation: data.officeLocation,
          social_links: data.social_links,
          verticalBlockColor: data.verticalBlockColor,
          verticalBlockTextColor: data.verticalBlockTextColor,
          verticalCircleColor: data.verticalBlockColor,
          verticalCircleTextColor: data.verticalBlockTextColor,
          logoBackgroundColor: data.logoBackgroundColor,
          card_name: data.card_name,
          position: data.position,
          department: data.department,
          pictures: data.pictures,
          personalDetails: data.personalDetails,
          accreditations: data.accreditations,
          employeePermissions: data.employeePermissions,
        }),
      );
      setTimeout(() => {
        setInitialized(true);
      }, 0);
    }
  }, [data]);

  const goBack = (): void => {
    if (cardView === CardView.VERTICAL) {
      dispatch(changeCardView(CardView.HORIZONTAL));
      return;
    }

    navigation.goBack();
  };

  const handleRemoveCard = async () => {
    if (!cardId) {
      return;
    }

    try {
      if (data?.isOwner) {
        await removeCard(cardId).unwrap();
      } else {
        await removeContact(cardId).unwrap();
      }
      navigation.navigate('Tabs', { screen: data?.inWallet ? 'Wallet' : 'Home' });
    } catch (e) {
      processApiError({ errors: getErrorData(e) });

      throw e;
    }
  };

  useMountEffect(() => {
    return () => {
      if (cardId) {
        dispatch(resetForm());
      }
    };
  });
  return (
    <MainContainer>
      <StackHeader text={cardId ? 'Edit Card' : `Create ${cardType} Card`} goBack={goBack} />
      <CardFillProgress />
      {initialized && (
        <>
          {cardView === CardView.HORIZONTAL && (
            <HorizontalViewForm
              isManually={data?.isManually}
              removeCard={cardId ? handleRemoveCard : undefined}
              isCardPhoto={Boolean(cardPhoto)}
              cardType={cardType}
            />
          )}
          {cardView === CardView.VERTICAL && (
            <CreateVerticalViewForm
              isManually={data?.isManually}
              removeCard={cardId ? handleRemoveCard : undefined}
              cardType={cardType}
            />
          )}
        </>
      )}
    </MainContainer>
  );
};
