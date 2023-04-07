import { useNavigation } from '@react-navigation/native';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Pressable, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'react-native-raw-bottom-sheet';

import { getFileNameFromUrl } from '~/utils/getFileNameFromUrl';
import { SvgIcon } from '~/view/components/SvgIcon';
import { SwipeDownModal } from '~/view/components/SwipeDownModal';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { AddContactModalRef } from '~/view/screens/Wallet/types';
import { FontFamily } from '~/view/theme';

interface Props {}

export const AddNewModal = forwardRef<AddContactModalRef, Props>((_, ref) => {
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    open() {
      bottomSheetRef.current?.open();
    },
    close() {
      bottomSheetRef.current?.close();
    },
  }));

  const scanQR = React.useCallback(() => {
    bottomSheetRef.current?.close();
    navigation.navigate('ScanCardQRCode');
  }, [navigation]);

  const addManually = React.useCallback(() => {
    bottomSheetRef.current?.close();
    navigation.navigate('AddContactManually', {});
  }, [navigation]);

  const scanCard = React.useCallback(async () => {
    const image = await ImagePicker.openCamera({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    });

    navigation.navigate('AddContactViaScanCard', {
      photo: {
        name: getFileNameFromUrl(image.path),
        uri: image.path,
        type: image.mime,
      },
    });
    bottomSheetRef.current?.close();
  }, [navigation]);

  return (
    <SwipeDownModal ref={bottomSheetRef} height={330}>
      <View style={styles.contentWrapper}>
        <Text variant="p2" fontFamily={FontFamily.SEMI_BOLD} style={styles.heading}>
          Add new contact
        </Text>
        <Pressable style={styles.option} onPress={addManually}>
          <View style={styles.iconContainer}>
            <SvgIcon name="plus" stroke={theme.colors.ink} size={16} />
          </View>
          <Text variant="p2">Add contact manually</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={scanCard}>
          <View style={styles.iconContainer}>
            <SvgIcon name="scan" stroke={theme.colors.ink} size={16} />
          </View>
          <Text variant="p2">Scan business card</Text>
        </Pressable>
        <Pressable style={styles.option} onPress={scanQR}>
          <View style={styles.iconContainer}>
            <SvgIcon name="qr" fill={theme.colors.ink} size={24} />
          </View>
          <Text variant="p2">Scan QR code</Text>
        </Pressable>
      </View>
    </SwipeDownModal>
  );
});

const useStyles = makeStyles(() => {
  return {
    contentWrapper: {
      marginTop: 38,
      paddingHorizontal: 25,
      paddingBottom: 30,
    },
    heading: {
      textAlign: 'center',
    },
    option: {
      marginTop: 25,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      backgroundColor: '#F7F7F7',
      width: 43,
      height: 43,
      borderRadius: 43 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 23,
    },
  };
});
