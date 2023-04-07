import * as React from 'react';
import { useRef } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';

import DropdownIcon from '~/view/assets/icons/dropdown.svg';
import { SortItem } from '~/view/components/Sorting/types';
import { SwipeDownModal } from '~/view/components/SwipeDownModal';
import { makeStyles, Text, theme, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

interface Props<TValue> {
  options: SortItem<TValue>[];
  selectedOption: SortItem<TValue>;
  style?: ViewStyle;
  onSelect?: (option: SortItem<TValue>) => void;
  title: string;
}

export const Sort = <TValue,>({
  options,
  selectedOption,
  style,
  onSelect,
  title,
}: Props<TValue>): React.ReactElement => {
  const styles = useStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSelect = React.useCallback(
    (option: SortItem<TValue>) => {
      if (onSelect) {
        onSelect(option);
      }
      bottomSheetRef.current?.close();
    },
    [onSelect],
  );

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable style={styles.container} onPress={() => bottomSheetRef.current?.open()}>
        <Text fontFamily={FontFamily.SEMI_BOLD} fontSize={12}>
          {title}
        </Text>
        <DropdownIcon width={16} height={16} color={theme.colors.ink} style={{ marginLeft: 6 }} />
      </Pressable>
      <SwipeDownModal ref={bottomSheetRef} height={250}>
        <View style={styles.modalContent}>
          <Text fontFamily={FontFamily.SEMI_BOLD} fontSize={16} style={styles.heading}>
            {title}
          </Text>
          {options.map((option, index) => (
            <Pressable
              onPress={() => handleSelect(option)}
              key={index}
              style={[styles.option, index === 0 && styles.firstOption]}
            >
              <Text
                fontSize={16}
                fontFamily={FontFamily.SEMI_BOLD}
                style={{ color: theme.colors.primary }}
              >
                {option.label}
              </Text>
              <View
                style={[
                  styles.radio,
                  selectedOption.value === option.value && styles.selectedRadio,
                ]}
              >
                {selectedOption.value === option.value && <View style={styles.radioDot} />}
              </View>
            </Pressable>
          ))}
        </View>
      </SwipeDownModal>
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    wrapper: {
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: '#E5EAF6',
      borderRadius: 22,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingHorizontal: 13,
      paddingVertical: 6,
      alignItems: 'center',
      backgroundColor: theme.colors.white,
    },
    modalContent: {
      paddingHorizontal: 24,
    },
    heading: {
      color: theme.colors.gray1,
      marginBottom: 5,
    },
    option: {
      paddingVertical: 20,
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      borderTopColor: '#E5EAF6',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    firstOption: {
      borderTopWidth: 0,
    },
    radio: {
      width: 22,
      height: 22,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#E5EAF6',
      borderRadius: 22 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedRadio: {
      borderColor: theme.colors.brandSecondary,
    },
    radioDot: {
      width: 12,
      height: 12,
      backgroundColor: theme.colors.brandSecondary,
      borderRadius: 12 / 2,
    },
  };
});
