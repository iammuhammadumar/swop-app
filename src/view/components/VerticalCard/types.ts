import { IconName } from '~/view/components/SvgIcon/SvgIcon';

export interface BasicSocial {
  value: string;
  iconName: IconName;
  onPress?(): void;
}
