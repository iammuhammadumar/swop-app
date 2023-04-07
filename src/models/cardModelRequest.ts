import { CardType } from '~/view/components/CreateCardButton/types';

interface BusinessDesign {
  background_logo_colour: string;
  horizontal_card_colour: string;
  horizontal_text_colour: string;
  vertical_block_colour: string;
  vertical_block_text_colour: string;
  icons_style: string;
  is_card_photo: boolean;
  horizontal_logo: string;
  vertical_photo: string;
  vertical_logo: string;
}
interface PersonalDesign {
  vertical_template_style: string;
  vertical_background_colour: string;
  vertical_text_colour: string;
  vertical_block_colour: string;
  vertical_block_text_colour: string;
  horizontal_card_colour: string;
  horizontal_icon_colour: string;
  horizontal_text_colour: string;
  vertical_photo: string;
}
export interface CardModelRequest {
  id?: number;
  phone: string;
  first_name: string;
  last_name: string;
  bio: string;
  company: string;
  position: string;
  team_name: string;
  type: CardType;
  department: 'App' | 'Manuallly';
  accreditations: string[] | null;
  email: string;
  address: string;
  website: string;
  card_name: string;
  photo: string;
  business_design?: BusinessDesign;
  personal_design?: PersonalDesign;
}
