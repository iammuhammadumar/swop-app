import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import WalletManager from 'react-native-wallet-manager';

import { dispatch } from '~/store';
import { useAppSelector } from '~/store/hooks';
import { resetForm } from '~/store/modules/cardForm';
import { CardView } from '~/store/modules/cardForm/consts';
import {
  useAddCardToWalletMutation,
  useCreateCardMutation,
  useGetCardQuery,
  useUpdateCardMutation,
} from '~/store/query/cards';
import { getErrorData } from '~/utils/getErrorData';
import { logger } from '~/utils/logger';
import { processApiError } from '~/utils/processApiError';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardType } from '~/view/components/CreateCardButton/types';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { HorizontalCard } from '~/view/components/HorizontalCard';
import { MainContainer } from '~/view/components/MainContainer';
import { VerticalCard } from '~/view/components/VerticalCard';
import { makeStyles, Text } from '~/view/plugins/theme';
import { CardViewSwitcher } from '~/view/screens/CardEditor/components/CardViewSwitcher';

type Props = NativeStackScreenProps<ReactNavigation.RootParamList, 'PreviewScreen'>;

export const PreviewScreen: React.VFC<Props> = ({ route }) => {
  const { cardType, isManually } = route.params ?? {};
  const navigation = useNavigation();
  const [cardView, setCardView] = useState<CardView>(CardView.HORIZONTAL);
  const styles = useStyles();
  const form = useAppSelector(state => state.cardForm.form);
  const cardId = useAppSelector(state => state.cardForm.cardId);
  const isCardPhoto = useAppSelector(state => state.cardForm.isCardPhoto);
  const { data } = useGetCardQuery({ id: Number(cardId) }, { skip: !cardId });
  const [createCard, { isLoading: isCreateLoading }] = useCreateCardMutation();
  const [updateCard, { isLoading: isUpdateLoading }] = useUpdateCardMutation();
  const [addCardToWallet] = useAddCardToWalletMutation();

  const horizontalCardFields = useMemo(
    () => ({
      isManually,
      photo: form.horizontalProfilePhoto,
      logo: form.horizontalCompanyLogo,
      firstName: form.firstName,
      lastName: form.lastName,
      cardColor: form.horizontalCardColor,
      textColor: form.horizontalTextColor,
      position:
        form.personalDetails.find(item => item.name === 'Position' || item.name === 'position')
          ?.value || form.position,
      logoBackgroundColor: form.logoBackgroundColor,
      cardName: form.card_name,
    }),
    [form, isManually],
  );
  const onWalletHandler = async (cardId: string): Promise<void> => {
    try {
      await WalletManager.addPassFromUrl(
        `https://swop-back-dev.appelloproject.xyz/api/cards/${cardId}/export`,
      );
    } catch (error) {
      logger.warn(error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (isManually) {
        await createCard({ isManually, form, cardType: CardType.BUSINESS }).unwrap();
        navigation.navigate('Tabs', { screen: 'Wallet' });
      } else {
        if (cardId) {
          await updateCard({ form, cardId, cardType }).unwrap();
        } else {
          const createdCardId = await createCard({ form, isCardPhoto, cardType }).unwrap();
          await addCardToWallet({ cardId: createdCardId }).unwrap();
          onWalletHandler(createdCardId);
        }
        dispatch(resetForm());
        navigation.navigate('Tabs', { screen: data?.inWallet ? 'Wallet' : 'Home' });
      }
    } catch (e) {
      processApiError({ errors: getErrorData(e) });
    }
  };
  return (
    <MainContainer>
      <StackHeader text={`Preview ${cardType} card`} />
      <CardViewSwitcher value={cardView} onChange={setCardView} />
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {cardView === CardView.HORIZONTAL && (
          <View style={styles.horizontalContainer}>
            <HorizontalCard
              {...horizontalCardFields}
              isCardPhoto={isCardPhoto}
              cardType={cardType}
            />
            <Text style={styles.horizontalText}>
              Here is your new digital {cardType} card. {'\n'}Click confirm to save changes
            </Text>
          </View>
        )}
        {cardView === CardView.VERTICAL && <VerticalCard cardType={cardType} fields={form} />}
        <View style={styles.btn}>
          <Button
            styleType={ButtonStyleType.PRIMARY}
            label="Confirm"
            onPress={handleSubmit}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles({
  container: {},
  horizontalContainer: {
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 25,
  },
  horizontalText: {
    marginTop: 30,
    lineHeight: 22,
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    paddingTop: 30,
    marginTop: 'auto',
    paddingHorizontal: 25,
  },
});
