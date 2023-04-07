import { ActionSheetIOS } from 'react-native';

interface Props {
  handlerOnPress: (buttonIndex: number) => void;
}
export type ActionSheetOptionsTypes =
  | 'Take Photo'
  | 'Cancel'
  | 'Photo Library'
  | 'Take Video'
  | 'Video Library'
  | 'Choose PDF';
export const openCameraSheetIos = (
  handlerOnPress: Props['handlerOnPress'],
  options: ActionSheetOptionsTypes[],
): void =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: options as ActionSheetOptionsTypes[],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'light',
    },
    buttonIndex => {
      handlerOnPress(buttonIndex);
    },
  );
