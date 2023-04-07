import React from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { CardType } from '~/view/components/CreateCardButton/types';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

interface Props {
  type: CardType;
  onPress?: () => void;
}

export const CreateCardButton: React.FC<Props> = ({ type, onPress }) => {
  const cardColor = useCardColor(type);
  const styles = useStyles();

  const gradientColors = React.useMemo(() => {
    if (type === CardType.PERSONAL) {
      return ['#58C3F9', '#58C3F9'];
    }
    if (type === CardType.SOCIAL) {
      return ['#3C9FEE', '#77CFFC'];
    }
    return ['#1168DC', '#1168DC'];
  }, [type]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.card} onPress={onPress}>
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientCard}
          useAngle
          angle={90}
          angleCenter={{
            x: 0.5,
            y: 0.5,
          }}
        >
          <View style={styles.iconContainer}>
            <SvgIcon name="plus" stroke={cardColor} size={25} />
          </View>
          <Text fontSize={14} fontWeight="600" style={styles.text}>
            {`Create my ${type} card`}
          </Text>
        </LinearGradient>
      </Pressable>
      <View style={styles.cardShadow} />
    </View>
  );
};

function useCardColor(cardType: CardType): string {
  const theme = useTheme();
  let cardColor = theme.colors.brand;
  if (cardType === CardType.PERSONAL) {
    cardColor = theme.colors.primary;
  }
  if (cardType === CardType.SOCIAL) {
    cardColor = theme.colors.brandSecondary;
  }
  return cardColor;
}

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    container: {
      alignItems: 'center',
    },
    card: {
      width: 325,
      height: 204,
      zIndex: 2,
      shadowColor: '#a8a8a8',
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      shadowOpacity: 0.6,
      elevation: 4,
    },
    gradientCard: {
      width: 325,
      height: 204,
      borderRadius: 13,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FDFDFD',
      borderStyle: 'solid',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      width: 55,
      height: 55,
      borderRadius: 55 / 2,
      marginBottom: 15,
    },
    text: {
      color: theme.colors.white,
      lineHeight: 21,
    },
    cardShadow: {
      backgroundColor: theme.colors.primary,
      width: 285,
      height: 178,
      borderRadius: 10,
      zIndex: 1,
      marginTop: -168,
    },
  };
});
