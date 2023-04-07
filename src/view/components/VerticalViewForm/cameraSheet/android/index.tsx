import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { CameraOptions } from 'react-native-image-picker';

import { ActionSheetOptionsTypes } from '../ios';

interface Props {
  handlerOnPress: (index: number, mediaType: CameraOptions['mediaType']) => void;
  mediaType: CameraOptions['mediaType'];
  options: ActionSheetOptionsTypes[];
}
export interface ShowActionSheetRef {
  open: () => void;
}
export const OpenCameraSheetAndroid = forwardRef<ShowActionSheetRef, Props>(
  ({ handlerOnPress, mediaType, options }, ref) => {
    const acctionSheetRef = useRef<ActionSheet>(null);

    const showActionSheet = () => {
      acctionSheetRef?.current?.show();
    };

    useImperativeHandle(ref, () => ({
      open() {
        showActionSheet();
      },
    }));

    return (
      <View>
        <ActionSheet
          ref={acctionSheetRef}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={index => {
            handlerOnPress(index, mediaType);
          }}
        />
      </View>
    );
  },
);
