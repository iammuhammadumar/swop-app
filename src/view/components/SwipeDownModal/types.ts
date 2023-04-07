import { IconName } from '~/view/components/SvgIcon/SvgIcon';

export interface ModalOption {
  label: string;
  iconName: IconName;
  onSelect?: () => void;
}
