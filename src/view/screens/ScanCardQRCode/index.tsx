import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { VFC } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { MainContainer } from '~/view/components/MainContainer';
import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, useTheme } from '~/view/plugins/theme';

export const ScanCardQRCodeScreen: VFC = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const styles = useStyles();
  const theme = useTheme();

  const handleRead = ({ data }: BarCodeReadEvent) => {
    Linking.openURL(data);
  };

  // todo: perhaps has to be in utils
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // todo: figure out
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.reset({
        key: 'Tabs',
        index: 0,
      });
    }
  };

  // qr scanner should be unmounted on next screens
  if (!isFocused) {
    return <View />;
  }

  return (
    <MainContainer>
      <QRCodeScanner
        onRead={handleRead}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
          <Pressable onPress={handleBack} style={styles.backBtn}>
            <SvgIcon name="back" stroke={theme.colors.ink} size={24} />
          </Pressable>
        }
      />
    </MainContainer>
  );
};

const useStyles = makeStyles({
  backBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 0,
  },
});
