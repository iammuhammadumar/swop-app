import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

interface Props {
  text?: string;
  goBack?: () => void;
  style?: ViewStyle;
  rightElement?: ReactElement;
}

export const StackHeader: React.FC<Props> = ({ text, goBack, style, rightElement }) => {
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();

  const handleBack = () => {
    if (goBack) {
      goBack();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.reset({
        key: 'Tabs',
        index: 0,
      });
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={handleBack} style={styles.backBtn}>
        <SvgIcon name="back" stroke={theme.colors.ink} size={24} />
      </Pressable>
      <Text fontSize={16} fontWeight="600" style={{ color: theme.colors.ink }}>
        {text}
      </Text>
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 10,
    paddingBottom: 8,
  },
  backBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 0,
  },
  rightElement: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    top: 0,
  },
});
