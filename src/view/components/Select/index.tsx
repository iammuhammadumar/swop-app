import React from 'react';
import { View, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { SvgIcon } from '~/view/components/SvgIcon';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';
import { FontFamily } from '~/view/theme';

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  containerStyle?: ViewStyle;
  onChange: (name: string, value: Nullable<number>) => void;
  label?: string;
  value: Nullable<number>;
  options: SelectOption[];
  error?: string;
  placeholder?: { label: string; value: Nullable<string> };
}

export const Select: React.FC<Props> = ({
  name,
  containerStyle,
  value,
  onChange,
  label,
  options,
  placeholder = { label: 'Select...', value: null },
  error,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const handleChange = React.useCallback(
    (value: Nullable<number>) => {
      onChange(name, value);
    },
    [name, onChange],
  );

  const inputContainerStyle = React.useMemo(() => {
    if (error) {
      return { ...styles.input, ...styles.errorInput };
    }
    return { ...styles.input };
  }, [error, styles.errorInput, styles.input]);

  const icon = React.useCallback(
    () => <SvgIcon name="dropdown" style={styles.icon} stroke={theme.colors.ink} size={15} />,
    [styles.icon, theme.colors.ink],
  );

  return (
    <View style={[containerStyle, styles.container]}>
      {label && (
        <Text variant="p1" style={styles.label}>
          {label}
        </Text>
      )}
      <RNPickerSelect
        value={value}
        onValueChange={value => handleChange(value)}
        items={options}
        useNativeAndroidPickerStyle={false}
        style={{
          inputAndroid: inputContainerStyle,
          inputIOS: inputContainerStyle,
        }}
        Icon={icon}
        placeholder={placeholder}
        disabled
      />
      {error && (
        <Text variant="error" style={{ marginTop: 2 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    container: {
      position: 'relative',
    },
    input: {
      borderRadius: theme.borderRadii.s,
      fontFamily: FontFamily.REGULAR,
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderColor: theme.colors.ink,
      fontSize: theme.textSize.l,
      color: theme.colors.ink,
      height: 40,
      paddingHorizontal: 15,
    },
    error: {
      color: 'red',
    },
    errorInput: {},
    icon: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    label: {
      marginBottom: 4,
      fontFamily: FontFamily.MEDIUM,
    },
  };
});
