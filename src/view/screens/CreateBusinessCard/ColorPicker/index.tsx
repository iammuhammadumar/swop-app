import React, { useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import ColorPicker from 'react-native-wheel-color-picker';

import { delateHEX, isValidHex } from '~/utils/checkHEXColor';
import { Button, ButtonStyleType } from '~/view/components/Button';
import { TextInput } from '~/view/components/form/TextInput';
import { StackHeader } from '~/view/components/Header/StackHeader';
import { MainContainer } from '~/view/components/MainContainer';
import { makeStyles, Text, useTheme } from '~/view/plugins/theme';

type Props = NativeStackScreenProps<ReactNavigation.RootParamList, 'ColorPicker'>;
interface InputColor {
  error: boolean;
  color: string;
}
export const ColorPickerScreen: React.VFC<Props> = ({ route, navigation }) => {
  const { title, initialColor, onSave } = route.params;
  const [currentColor, setCurrentColor] = React.useState<string>(delateHEX(initialColor));
  const [inputCurrentColor, setInputCurrentColor] = React.useState<InputColor>({
    color: delateHEX(initialColor),
    error: false,
  });
  const styles = useStyles();

  const onConfirm = React.useCallback(() => {
    if (!inputCurrentColor.error) {
      onSave(`#${currentColor}`);
      navigation.goBack();
    }
  }, [currentColor, navigation, onSave, inputCurrentColor.error]);

  useEffect(() => {
    setInputCurrentColor({ color: currentColor, error: false });
  }, [currentColor]);

  const onInputColorChangeHandler = useCallback((color: string) => {
    const isValidColor = isValidHex(`#${color}`);
    setInputCurrentColor({ color, error: !isValidColor });
    if (isValidColor) {
      setCurrentColor(color);
    }
  }, []);

  return (
    <MainContainer>
      <StackHeader text={title} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          pagingEnabled
        >
          <View style={styles.colorContiner}>
            <ColorPicker
              color={`#${currentColor}`}
              onColorChangeComplete={color => {
                setCurrentColor(delateHEX(color));
              }}
              thumbSize={30}
              sliderSize={30}
              gapSize={20}
            />

            {/* <Button
          styleType={ButtonStyleType.SECONDARY}
          label={`${currentColor}`}
          containerStyle={styles.currentColor}
          disabled
        /> */}
            <TextInput
              autoCapitalize="none"
              onChangeText={color => onInputColorChangeHandler(delateHEX(color))}
              value={`#${inputCurrentColor.color}`}
              autoCorrect={false}
              style={[styles.input, inputCurrentColor.error && styles.errorTextInput]}
            />

            {inputCurrentColor.error && <Text style={styles.error}>Incorect Color</Text>}
            <Button
              styleType={ButtonStyleType.PRIMARY}
              label="Confirm"
              containerStyle={styles.btn}
              onPress={onConfirm}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();

  return {
    input: {
      marginTop: 20,
      borderRadius: theme.borderRadii.m,
      height: 44,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray4,
    },
    colorContiner: {
      height: '70%',
      width: '100%',
    },
    container: {
      height: '100%',
      paddingHorizontal: 25,
    },
    btn: {
      marginTop: 20,
    },
    currentColor: {
      marginTop: 20,
    },
    errorTextInput: {
      borderColor: theme.colors.negative,
    },
    error: {
      color: theme.colors.negative,
      fontSize: theme.textSize.s,
    },
  };
});
