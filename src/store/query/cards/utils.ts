import { makeFormData } from '@appello/common/lib/utils';
import { isPlainObject } from '@appello/common/lib/utils/object';
import { isString } from '@appello/common/lib/utils/string';
import { ReactNativeFile } from '@appello/mobile/lib/classes/ReactNativeFile';
import deepMerge from 'deepmerge';

import { CardDetails, CardModel } from '~/models/businessCard';
import { IconsType } from '~/store/modules/cardForm/consts';
import { CardFormValues } from '~/store/modules/cardForm/types';
import { isExternalLogo } from '~/store/modules/cardForm/utils';

import { CardType } from '../../../view/components/CreateCardButton/types';

export interface EmployeePermissionsType {
  type: number;
  value: boolean;
}
const setTemplateSocialFilds = (
  dataSocialLinks: CardDetails[],
  templateSocialsLinks: CardDetails[],
  employeePermissions: EmployeePermissionsType[],
): CardDetails[] => {
  let result: CardDetails[] = [];
  result = dataSocialLinks.map((item: CardDetails) => {
    if (item.type.name === 'phone' || item.type.name === 'email' || item.type.name === 'address') {
      return {
        ...item,
        editable: false,
      };
    }
    return {
      ...item,
      editable: employeePermissions.some((el: EmployeePermissionsType) => el.type === item.type.id),
    };
  });
  result = result.concat(
    templateSocialsLinks
      .filter((item: CardDetails) => {
        return !item?.type?.is_file;
      })
      .map((item: CardDetails) => {
        return {
          ...item,
          editable: false,
        };
      }),
  );
  result = result.map((item: CardDetails) => {
    return {
      ...item,
      custom_name: item.custom_name || '',
    };
  });
  return result;
};
export function createBusinessCardFromApi(data: Record<string, any>): CardModel {
  const dataForm = {
    id: data.id,
    photo: data.photo,
    firstName: data.first_name,
    lastName: data.last_name,
    inWallet: !!data.in_wallet,
    isOwner: data.is_owner,
    phoneNumber: data.phone,
    email: data.email,
    position: data.position,
    social_links: data.social_links
      .filter((item: CardDetails) => {
        return !item?.type?.is_file;
      })
      .map((item: CardDetails) => {
        let value: string;
        if (item.type.name.toLowerCase() === 'phone' && item.value.startsWith('+61')) {
          const newValue = item.value;
          value = newValue.slice(3);
        } else {
          value = item.value;
        }
        return {
          ...item,
          value,
          editable: true,
        };
      }),
    pictures: data.social_links.filter((item: CardDetails) => {
      return item.type?.is_file === true;
    }),
    officeLocation: data.address,
    personalDetails: [
      { name: 'position', value: data.position, editable: true },
      { name: 'team_name', value: data.team_name, editable: true },
      { name: 'department', value: data.department, editable: true },
      { name: 'company', value: data.company, editable: true },
      { name: 'bio', value: data.bio, editable: true },
    ].filter(item => item.value),
    isManually: data.type === 'Manually',
    accreditations: data.accreditations
      ? data.accreditations.map((accValue: string) => {
          return { value: accValue };
        })
      : [],
    logoBackgroundColor:
      data.business_design?.background_logo_colour || data.personal_design?.background_logo_colour,
    horizontalLogo: data.business_design?.horizontal_logo,
    verticalBlockColor:
      data?.business_design?.vertical_block_colour || data?.personal_design?.vertical_block_colour,
    verticalBlockTextColor:
      data?.business_design?.vertical_block_text_colour ||
      data?.personal_design?.vertical_block_text_colour,
    verticalPhoto: data.business_design?.vertical_photo || data.personal_design?.vertical_photo,
    horizontalCardColor:
      data.business_design?.horizontal_card_colour || data.personal_design?.horizontal_card_colour,
    verticalLogo: data?.business_design?.vertical_logo || data?.personal_design?.vertical_photo,
    horizontalTextColor:
      data?.business_design?.horizontal_text_colour ||
      data?.personal_design?.horizontal_text_colour,
    iconsType: data.business_design?.icons_style || data.personal_design?.icons_style,
    isCardPhoto: Boolean(data?.business_design?.is_card_photo),
    card_name: data.card_name,
    horizontalIconColor:
      data.business_design?.icon_colour || data.personal_design?.horizontal_icon_colour,
    cardType: data.business_design ? CardType.BUSINESS : CardType.PERSONAL,
    fromWeb: data.type === 'Web',
    allow_change_vertical_profile_picture: true,
    allow_change_profile_picture: true,
    allow_change_cover_photo: true,
  };
  if (data.template) {
    return {
      ...dataForm,
      employeePermissions: data.template.employee_permissions,
      allow_change_vertical_profile_picture: data.template.allow_change_vertical_profile_picture,
      allow_change_profile_picture: data.template.allow_change_profile_picture,
      allow_change_cover_photo: data.template.allow_change_cover_photo,
      horizontalCardColor: data.template.card_colour,
      horizontalLogo: data.template.company_logo,
      verticalLogo: data.cover_photo || data.template.cover_photo,
      verticalPhoto: data.vertical_photo,
      horizontalTextColor: data.template.text_colour,
      horizontalIconColor: data.template.icon_colour,
      social_links: setTemplateSocialFilds(
        data.social_links,
        data.template.company_social_links,
        data.template.employee_permissions,
      ),
      accreditations: data.template.employee_details.show_accreditations
        ? data.accreditations ||
          [].map((accValue: string) => {
            return { value: accValue };
          })
        : [],
      personalDetails: [
        {
          name: 'position',
          value: data.template.employee_details.show_position ? data.position : '',
          editable: false,
        },
        {
          name: 'team_name',
          value: data.template.employee_details.show_team ? data.team_name : '',
          editable: false,
        },
        {
          name: 'department',
          value: data.template.employee_details.show_department ? data.department : '',
          editable: false,
        },
        {
          name: 'company',
          value: data.template.employee_details.show_company ? data.company : '',
          editable: false,
        },
        {
          name: 'bio',
          value: data.template.employee_details.show_bio ? data.bio : '',
          editable: false,
        },
      ].filter(item => item.value),
      // officeLocation: data.template.show_address,
      // bio: data.template.show_bio,
      // company: data.template.show_company,
      // department: data.template.show_department,
      // email: data.template.show_email,
      // phoneNumber: data.template.show_phone,
      // position: data.template.show_position,
      // teamName: data.template.show_team,

      // pictures: data.template.social_links.filter((item: CardDetails) => {
      //   return item.type?.is_file === true;
      // }),
      // website: data.template.show_website,
    };
  }
  return dataForm;
}

export function mapCreateCardFields(
  form: CardFormValues,
  additionalFields?: Record<string, unknown>,
): FormData {
  const createCardData = () => {
    if (form.fromWeb) {
      return {
        vertical_photo:
          form.verticalProfilePhoto && !isString(form.verticalProfilePhoto)
            ? new ReactNativeFile(form.verticalProfilePhoto)
            : null,
        cover_photo:
          form.verticalCompanyLogo && !isString(form.verticalCompanyLogo)
            ? new ReactNativeFile(form.verticalCompanyLogo)
            : null,
      };
    }
    return additionalFields?.cardType === CardType.BUSINESS
      ? {
          business_design: {
            vertical_block_colour:
              form.iconsType === IconsType.BLOCKS
                ? form.verticalBlockColor
                : form.verticalCircleColor,
            vertical_block_text_colour:
              form.iconsType === IconsType.BLOCKS
                ? form.verticalBlockTextColor
                : form.verticalCircleTextColor,
            horizontal_card_colour: form.horizontalCardColor,
            horizontal_text_colour: form.horizontalTextColor,
            vertical_photo:
              form.verticalProfilePhoto && !isString(form.verticalProfilePhoto)
                ? new ReactNativeFile(form.verticalProfilePhoto)
                : null,
            vertical_logo:
              form.verticalCompanyLogo && !isString(form.verticalCompanyLogo)
                ? new ReactNativeFile(form.verticalCompanyLogo)
                : null,
            horizontal_logo:
              form.horizontalCompanyLogo && !isString(form.horizontalCompanyLogo)
                ? new ReactNativeFile(form.horizontalCompanyLogo)
                : null,
            background_logo_colour: form.logoBackgroundColor,
            icons_style: form.iconsType,
            icon_colour: form.horizontalIconColor,
          },
        }
      : {
          personal_design: {
            vertical_block_colour:
              form.iconsType === IconsType.BLOCKS
                ? form.verticalBlockColor
                : form.verticalCircleColor,
            vertical_block_text_colour:
              form.iconsType === IconsType.BLOCKS
                ? form.verticalBlockTextColor
                : form.verticalCircleTextColor,
            vertical_photo:
              form.verticalCompanyLogo && !isString(form.verticalCompanyLogo)
                ? new ReactNativeFile(form.verticalCompanyLogo)
                : null,
            horizontal_icon_color: form.horizontalIconColor,
            horizontal_card_colour: form.horizontalCardColor,
            horizontal_text_colour: form.horizontalTextColor,
            icons_style: form.iconsType,
            horizontal_icon_colour: form.horizontalIconColor,
          },
        };
  };
  const changePersonalDetails = () => {
    const reqData: { [key: string]: string | undefined } = {};
    form.personalDetails.forEach(item => {
      if (item.name) {
        reqData[
          item.name?.toLocaleLowerCase() === 'team'
            ? 'team_name'
            : item?.name && item?.name?.toLocaleLowerCase()
        ] = item.value;
      }
    });
    return reqData;
  };
  const setFile = (file: string | ReactNativeFile | undefined) => {
    return typeof file === 'string' || !file ? {} : { file: new ReactNativeFile(file) };
  };
  const setId = (id: number | undefined) => {
    return (id && { id }) || {};
  };
  const setSocialLinks = () => {
    let socialLinks: any[] = [];
    if (form.social_links?.length) {
      socialLinks = socialLinks.concat(
        form.social_links.map((item: CardDetails) => {
          let value: string;

          if (item.type.name.toLowerCase() === 'phone') {
            value = `+61${item.value}`;
          } else {
            value = item.value;
          }

          return {
            ...setId(item.id),
            type: item?.type?.id,
            custom_name: item.custom_name,
            value,
            latitude: item.latitude,
            longitude: item.longitude,
          };
        }),
      );
    }
    if (form.pictures?.length) {
      socialLinks = socialLinks.concat(
        form.pictures.map((item: CardDetails) => {
          return {
            ...setId(item.id),
            type: item?.type?.id,
            custom_name: item.custom_name || item.value,
            value: item.value,
            ...setFile(item.file),
          };
        }),
      );
    }
    return socialLinks;
  };
  const formData = makeFormData(
    deepMerge(
      {
        card_type: additionalFields?.cardType === CardType.BUSINESS ? 'busines' : 'personal',
        ...createCardData(),
        social_links: setSocialLinks(),
        template: {},
        phone: form.phoneNumber,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        address: form.officeLocation,
        ...changePersonalDetails(),
        card_name: form.card_name,
        photo:
          form.horizontalProfilePhoto && !isString(form.horizontalProfilePhoto)
            ? new ReactNativeFile(form.horizontalProfilePhoto)
            : null,
        vertical_logo_external_link:
          typeof form.verticalCompanyLogo === 'string' && isExternalLogo(form.verticalCompanyLogo)
            ? form.verticalCompanyLogo
            : null,
        horizontal_logo_external_link:
          typeof form.horizontalCompanyLogo === 'string' &&
          isExternalLogo(form.horizontalCompanyLogo)
            ? form.horizontalCompanyLogo
            : null,
      },

      additionalFields ?? {},
      {
        isMergeableObject: isPlainObject,
      },
    ),
  );

  if (form.accreditations && Array.isArray(form.accreditations) && form.accreditations.length > 0) {
    form.accreditations.forEach(accreditation => {
      if (accreditation.value) {
        formData.append('accreditations', accreditation.value);
      }
    });
  }
  if (form.verticalCompanyLogo && additionalFields?.cardtype === CardType.PERSONAL) {
    if (isString(form.verticalCompanyLogo)) {
      if (isExternalLogo(form.verticalCompanyLogo)) {
        formData.append('personal_design.vertical_logo', form.verticalCompanyLogo);
      }
    } else {
      formData.append('personal_design.vertical_logo', form.verticalCompanyLogo as unknown as File);
    }
  }
  return formData;
}
