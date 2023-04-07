import { IS_ANDROID } from '@appello/mobile/lib/constants/platform';
import React, { FC, PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, ColorsVariants, makeStyles } from '~/view/plugins/theme';

type MainContainerProps = PropsWithChildren<{
  backgroundColor?: ColorsVariants;
  withTabBar?: boolean;
}>;

export const MainContainer: FC<MainContainerProps> = ({
  backgroundColor = 'white',
  withTabBar,
  children,
}) => {
  const styles = useStyles();

  return (
    <Box {...{ backgroundColor }} style={[styles.main, withTabBar && styles.tabBarPadding]}>
      <StatusBar animated barStyle="dark-content" />
      <Box flex={1}>{children}</Box>
    </Box>
  );
};

const useStyles = makeStyles(() => {
  const { top, bottom } = useSafeAreaInsets();

  return {
    main: {
      flex: 1,
      paddingTop: top + 10,
      paddingBottom: bottom + (IS_ANDROID ? 20 : 0),
    },
    tabBarPadding: {
      paddingBottom: 97,
    },
  };
});
