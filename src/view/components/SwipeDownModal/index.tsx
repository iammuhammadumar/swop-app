import { IS_ANDROID } from '@appello/mobile/lib/constants/platform';
import React, { forwardRef, ReactNode } from 'react';
import BottomSheet from 'react-native-raw-bottom-sheet';

import { makeStyles, useTheme } from '~/view/plugins/theme';

interface Props {
  children: ReactNode;
  height: number;
}

export const SwipeDownModal = forwardRef<BottomSheet, Props>(({ children, height }, ref) => {
  const styles = useStyles();

  return (
    <BottomSheet
      height={height}
      openDuration={IS_ANDROID ? 0 : undefined}
      closeDuration={IS_ANDROID ? 0 : undefined}
      ref={ref}
      closeOnDragDown
      customStyles={{ container: styles.container }}
    >
      {children}
    </BottomSheet>
  );
});

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      backgroundColor: theme.colors.white,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
  };
});
