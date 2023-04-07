import { isString } from '@appello/common/lib/utils/string';
import React, { FC, memo, ReactElement, useEffect, useRef } from 'react';
import { Dimensions, Platform, Pressable, StyleProp, ViewStyle } from 'react-native';

import { IconContainer } from '~/view/components/IconContainer';
import {
  OpenCameraSheetAndroid,
  ShowActionSheetRef,
} from '~/view/components/VerticalViewForm/cameraSheet/android';
import { openCameraSheetIos } from '~/view/components/VerticalViewForm/cameraSheet/ios';
import { usePDFPicker } from '~/view/components/VerticalViewForm/cameraSheet/pickers/filePicker';
import { AddCardDetailsOptions } from '~/view/navigation/list';
import { makeStyles, Text } from '~/view/plugins/theme';

interface SectionItemProps {
  iconImage: string | ReactElement;
  color?: string;
  name: string;
  onSelect: (id: number, options: AddCardDetailsOptions) => void;
  id: number;
  containerStyles?: StyleProp<ViewStyle>;
  mediaType: 'PDF';
}

const { width: windowWidth } = Dimensions.get('window');

export const SectionPDFItem: FC<SectionItemProps> = memo(
  ({ iconImage, color, name, containerStyles, onSelect, id }) => {
    const styles = useStyles();
    const cameraRef = useRef<ShowActionSheetRef>(null);
    const { getPDFFromFiles, file, deletePDF } = usePDFPicker();
    useEffect(() => {
      if (file) {
        onSelect(id, {
          sectionType: 'pictures',
          item: {
            type: {
              id,
              name,
              logo: isString(iconImage) ? iconImage : '',
              is_file: true,
            },
            custom_name: '',
            value: file.name,
            file,
            editable: true,
          },
        });
        deletePDF();
      }
    }, [file, onSelect, id, deletePDF, iconImage, name]);
    const hendlerOpenCameraSheet = (index: number): void => {
      switch (index) {
        case 1:
          getPDFFromFiles();
          break;

        default:
          deletePDF();
      }
    };

    const onPressHandler = () => {
      if (Platform.OS === 'android') {
        cameraRef?.current?.open();
      } else if (Platform.OS === 'ios') {
        openCameraSheetIos(
          (index: number) => hendlerOpenCameraSheet(index),
          ['Cancel', 'Choose PDF'],
        );
      }
    };

    return (
      <>
        <Pressable style={[styles.root, containerStyles]} onPress={onPressHandler}>
          {typeof iconImage === 'string' ? (
            <IconContainer style={styles.icon} {...{ iconImage }} color={color} />
          ) : (
            <IconContainer style={styles.icon}>{iconImage}</IconContainer>
          )}
          <Text fontWeight="500" variant="c1">
            {name}
          </Text>
        </Pressable>
        {Platform.OS === 'android' && (
          <OpenCameraSheetAndroid
            handlerOnPress={hendlerOpenCameraSheet}
            mediaType="mixed"
            ref={cameraRef}
            options={['Cancel', 'Choose PDF']}
          />
        )}
      </>
    );
  },
);

const useStyles = makeStyles({
  icon: {
    marginBottom: 6,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 3,
    paddingVertical: 21,
  },
});
