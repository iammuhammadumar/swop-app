import React, { VFC } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useGetCardQuery } from '~/store/query/cards';
import { useSaveContactMutation } from '~/store/query/wallet';
import { getErrorData } from '~/utils/getErrorData';
import { processApiError } from '~/utils/processApiError';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { VerticalCard } from '~/view/components/VerticalCard';
import { makeStyles, useTheme } from '~/view/plugins/theme';
import { Text } from '~/view/plugins/theme';

interface Props extends NativeStackScreenProps<ReactNavigation.RootParamList, 'BusinessCard'> {}

export const BusinessCardScreen: VFC<Props> = ({ route, navigation }) => {
  const { id, cardType } = route.params;
  const styles = useStyles();
  const { data, error } = useGetCardQuery({ id }, { refetchOnFocus: true });
  const theme = useTheme();
  const [saveContact, { isLoading: isSaveContactLoading }] = useSaveContactMutation();
  const handleContactSave = async () => {
    try {
      await saveContact({ cardId: id }).unwrap();
      navigation.navigate('Tabs', { screen: 'Wallet' });
    } catch (e) {
      processApiError({ errors: getErrorData(e) });
    }
  };

  const handleEdit = React.useCallback(() => {
    navigation.navigate('CardEditor', { cardId: id, cardType });
  }, [cardType, id, navigation]);

  return (
    <MainContainer>
      <StackHeader
        text={`${cardType} card`}
        style={{ paddingBottom: 20 }}
        rightElement={
          data?.isOwner ? (
            <Pressable onPress={handleEdit}>
              <Text fontSize={16} style={{ color: theme.colors.brand }}>
                Edit
              </Text>
            </Pressable>
          ) : undefined
        }
      />
      <ScrollView>
        {data && <VerticalCard cardType={cardType} fields={data} />}
        {error && 'status' in error && error?.status === 404 && (
          <Text style={{ alignSelf: 'center' }} color="negative">
            Resource not found
          </Text>
        )}
        {Boolean(data && !data?.isOwner && !data?.inWallet) && (
          <Button
            label="Save to contacts"
            styleType={ButtonStyleType.PRIMARY}
            onPress={handleContactSave}
            containerStyle={styles.saveBtn}
            isLoading={isSaveContactLoading}
          />
        )}
      </ScrollView>
    </MainContainer>
  );
};

const useStyles = makeStyles(() => ({
  saveBtn: {
    marginHorizontal: 25,
    marginTop: 30,
  },
}));
