import { useNavigation } from '@react-navigation/native';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Share from 'react-native-share';

import { buildLink } from '~/utils/firabaseLinking';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { CardType } from '~/view/components/CreateCardButton/types';
import { Text } from '~/view/plugins/theme';
import { makeStyles, useTheme } from '~/view/plugins/theme';

import { ShareCardModalRef } from './types';

interface Props {
  id: number;
  cardType: CardType;
}

export const ShareCardModal = forwardRef<ShareCardModalRef, Props>(({ id, cardType }, ref) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    const getUrl = async () => {
      const cardLink = await buildLink({ id, cardType });
      setCardLink(cardLink);
    };
    getUrl();
  }, [cardType, id]);

  useImperativeHandle(ref, () => ({
    open() {
      bottomSheetRef.current?.open();
    },
    close() {
      bottomSheetRef.current?.close();
    },
  }));

  const shareLink = async () => {
    await Share.open({ url: cardLink });
  };

  const goToCardInner = () => {
    bottomSheetRef.current?.close();
    navigation.navigate('BusinessCard', { id, cardType });
  };

  return (
    <BottomSheet
      height={550}
      ref={bottomSheetRef}
      closeOnDragDown
      customStyles={{ container: styles.container }}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <View style={styles.codeWrapper}>
            <QRCode value={cardLink} size={115} />
          </View>
          <Text style={styles.scanText}>Scan my QR code</Text>
          <Button
            label="Share link"
            containerStyle={styles.shareBtn}
            textStyle={styles.shareBtnText}
            icon="share"
            fullWidth
            onPress={shareLink}
          />
          <Button
            label="View my card"
            styleType={ButtonStyleType.PRIMARY}
            fullWidth
            onPress={goToCardInner}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    shareBtnText: {
      color: theme.colors.primary,
    },
    scanText: {
      color: theme.colors.white,
      fontSize: theme.textSize.l,
      letterSpacing: 0.364,
      marginTop: 10,
      marginBottom: 40,
    },
    codeWrapper: {
      padding: 45,
      backgroundColor: theme.colors.white,
      borderRadius: 25,
    },
    container: {
      backgroundColor: theme.colors.brand,
    },
    content: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 25,
    },
    contentWrapper: {
      flex: 1,
      justifyContent: 'center',
    },
    shareBtn: {
      backgroundColor: theme.colors.white,
      marginBottom: 20,
    },
  };
});
