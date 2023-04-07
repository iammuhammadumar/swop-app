import React from 'react';
import { View, ViewStyle } from 'react-native';

import { Button, ButtonStyleType } from '~/view/components/Button';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

interface Props {
  containerStyle?: ViewStyle;
  heading: string;
  text: string;
  onPress?: () => void;
}

export const SuccessMessage: React.VFC<Props> = ({ containerStyle, text, heading, onPress }) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        <SvgIcon name="check" size={34} stroke={theme.colors.white} />
      </View>
      <Text variant="h1" textAlign="center">
        {heading}
      </Text>
      <Text variant="p2" textAlign="center">
        {text}
      </Text>
      <Button
        onPress={onPress}
        styleType={ButtonStyleType.PRIMARY}
        label="Ok"
        containerStyle={styles.btn}
        fullWidth
      />
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    iconContainer: {
      width: 81,
      height: 81,
      backgroundColor: theme.colors.brandSecondary,
      borderRadius: 81 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    btn: {
      marginTop: 40,
    },
  };
});
