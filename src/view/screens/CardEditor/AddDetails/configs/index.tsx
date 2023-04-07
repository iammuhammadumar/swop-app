import React from 'react';
import { ReactElement } from 'react';

import { DetailsSections } from '~/store/modules/cardForm/types';
import AccreditationIcon from '~/view/assets/icons/personal-details/accreditation.svg';
import BioIcon from '~/view/assets/icons/personal-details/bio.svg';
import CompanyIcon from '~/view/assets/icons/personal-details/company.svg';
import DepartmentIcon from '~/view/assets/icons/personal-details/department.svg';
import PositionIcon from '~/view/assets/icons/personal-details/position.svg';
import TeamIcon from '~/view/assets/icons/personal-details/team.svg';

export interface PersonalData {
  id: number;
  sectionType: DetailsSections;
  name: string;
  logo: ReactElement;
  inputName?: string;
}

export const personalData: PersonalData[] = [
  {
    id: Math.random(),
    sectionType: 'personalDetails',
    name: 'Position',
    logo: <PositionIcon color="white" />,
    inputName: 'position',
  },
  {
    id: Math.random(),
    sectionType: 'personalDetails',
    name: 'Team',
    logo: <TeamIcon color="white" />,
    inputName: 'team_name',
  },
  {
    id: Math.random(),
    sectionType: 'personalDetails',
    name: 'Department',
    logo: <DepartmentIcon color="white" />,
    inputName: 'department',
  },
  {
    id: Math.random(),
    sectionType: 'personalDetails',
    name: 'Company',
    logo: <CompanyIcon color="white" />,
    inputName: 'company',
  },
  {
    id: Math.random(),
    sectionType: 'personalDetails',
    name: 'Bio',
    logo: <BioIcon color="white" />,
    inputName: 'bio',
  },
  {
    id: Math.random(),
    sectionType: 'accreditations',
    name: 'Accreditations',
    logo: <AccreditationIcon color="white" />,
  },
];
