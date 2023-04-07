import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

import { useGetMyCardsQuery } from '~/store/query/cards';
// import { Button, ButtonStyleType } from '~/view/components/Button';
import { CreateCardButton } from '~/view/components/CreateCardButton/CreateCardButton';
import { CardType } from '~/view/components/CreateCardButton/types';
import { makeStyles, useTheme } from '~/view/plugins/theme';
import { CardWrapper } from '~/view/screens/Home/components/CardWrapper';

export const BusinessCards: React.FC = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { data: cards = [], refetch, isLoading, isSuccess } = useGetMyCardsQuery();
  const isFocused = useIsFocused();
  const theme = useTheme();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.section}>
        {isLoading && (
          <Flow
            color={theme.colors.brand}
            style={{ marginTop: 50, alignSelf: 'center' }}
            size={60}
          />
        )}
        {isSuccess && cards.length === 0 && (
          <CreateCardButton
            type={CardType.BUSINESS}
            onPress={() => navigation.navigate('CreateBusinessCard', { screen: 'ChooseMethod' })}
          />
        )}
        {cards.length > 0 && (
          <>
            {cards.map(card => (
              <CardWrapper key={card.id} card={card} cardType={CardType.BUSINESS} />
            ))}
            {/* <Button
              styleType={ButtonStyleType.PRIMARY}
              label="Create my business card"
              onPress={() => navigation.navigate('CreateBusinessCard', { screen: 'ChooseMethod' })}
              containerStyle={{ paddingHorizontal: 30 }}
            /> */}
            <CreateCardButton
              type={CardType.BUSINESS}
              onPress={() => navigation.navigate('CreateBusinessCard', { screen: 'ChooseMethod' })}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    content: {
      paddingHorizontal: 25,
      alignItems: 'center',
      paddingBottom: 135,
    },
    section: {
      alignItems: 'center',
      marginTop: 20,
    },
    sectionHeader: {
      color: theme.colors.primary,
      lineHeight: 34,
      marginBottom: 2,
    },
  };
});
