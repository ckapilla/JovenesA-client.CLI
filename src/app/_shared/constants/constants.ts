import { GRADESPROCESSINGPERIOD } from '../interfaces/GRADESPROCESSINGPERIOD';
import { SELECTITEM } from '../interfaces/SELECTITEM';

const currentContactYear: number = null;
const currentContactMonth: number = null;
const ssrDateRange: string = 'NODATEYET';

const joinedYears: SELECTITEM[] = [];
const gradYears: SELECTITEM[] = [];
const contactYears: SELECTITEM[] = [];


const months: SELECTITEM[] = [
  { value: '1', label: 'Jan/Ene' },
  { value: '2', label: 'Feb/Feb' },
  { value: '3', label: 'Mar/Mar' },
  { value: '4', label: 'Apr/Abr' },
  { value: '5', label: 'May/May' },
  { value: '6', label: 'Jun/Jun' },
  { value: '7', label: 'Jul/Jul' },
  { value: '8', label: 'Aug/Ago' },
  { value: '9', label: 'Sep/Set' },
  { value: '10', label: 'Oct/Oct' },
  { value: '11', label: 'Nov/Nov' },
  { value: '12', label: 'Dec/Dic' }
];

const qrPeriods: SELECTITEM[] = []

const gradesProcessingPeriods: GRADESPROCESSINGPERIOD[] = [
  { id: '101', descriptor: '2021-01-01 (Cuatrimestre)', studentReportingStartDate:'2021-01-01',  endDate:'2021-01-15', yearTypeId: 2032, isCurrent: false },
  { id: '102', descriptor: '2021-01-01 (Semestre)', studentReportingStartDate:'2021-01-01', endDate:'2021-01-15', yearTypeId: 2031, isCurrent: false},
  { id: '103', descriptor: '2021-05-01 (Cuatrimestre)', studentReportingStartDate:'2021-05-01', endDate:'2021-05-15', yearTypeId: 2032, isCurrent: false },
  { id: '104', descriptor: '2021-08-01 (Semestre)', studentReportingStartDate:'2021-08-01', endDate:'2021-08-15', yearTypeId: 2031, isCurrent: false  },
  { id: '105', descriptor: '2021-09-01 (Cuatrimestre)', studentReportingStartDate:'2021-09-01', endDate:'2021-09-15', yearTypeId: 2032, isCurrent: false},
  { id: '106', descriptor: '2022-01-01 (Cuatrimestre)', studentReportingStartDate:'2022-01-15', endDate:'2022-01-15', yearTypeId: 2032, isCurrent: false },
  { id: '107', descriptor: '2022-01-01 (Semestre)', studentReportingStartDate:'2022-01-01', endDate:'2022-01-15', yearTypeId: 2031, isCurrent: false},
  { id: '108', descriptor: '2022-05-01 (Cuatrimestre)', studentReportingStartDate:'2022-05-01', endDate:'2022-05-15', yearTypeId: 2032, isCurrent: false },
  { id: '109', descriptor: '2022-08-01 (Semestre)', studentReportingStartDate:'2022-08-01', endDate:'2022-08-15', yearTypeId: 2031, isCurrent: false },
  { id: '110', descriptor: '2022-09-01 (Cuatrimestre)', studentReportingStartDate:'2022-09-01', endDate:'2022-09-22', yearTypeId: 2032, isCurrent: false },

  { id: '111', descriptor: '2023-01-01 (Semestre)', studentReportingStartDate:'2023-01-01', endDate:'2023-01-22', yearTypeId: 2031, isCurrent: false },
  { id: '112', descriptor: '2023-01-01 (Cuatrimestre)', studentReportingStartDate:'2023-01-01', endDate:'2023-01-22', yearTypeId: 2032, isCurrent: false },
  { id: '113', descriptor: '2023-05-01 (Cuatrimestre)', studentReportingStartDate:'2023-05-01', endDate:'2023-07-31', yearTypeId: 2032, isCurrent: false },
  { id: '114', descriptor: '2023-08-01 (Cuatrimestre)', studentReportingStartDate:'2023-08-01', endDate:'2023-08-31', yearTypeId: 2031, isCurrent: true },
  { id: '115', descriptor: '2023-09-01 (Cuatrimestre)', studentReportingStartDate:'2023-09-01', endDate:'2023-09-30', yearTypeId: 2032, isCurrent: false },


];

const genders: SELECTITEM[] = [
  { value: 'M', label: 'Male/Hombre' },
  { value: 'F', label: 'Female/Mujer' }
];

const emojis = [
  '/assets/images/needsAttention.jpg',
  '/assets/images/thumbsUp.jpg',
  '/assets/images/celebrate.jpg',
  '/assets/images/concerned.jpg',
  '/assets/images/NA.jpg'
];

const languageStatuses: SELECTITEM[] = [
];

const studentStatuses: SELECTITEM[] = [
];
const memberStatuses: SELECTITEM[] = [
];
const reviewedStatuses: SELECTITEM[] = [
];
const reviewedQRStatuses: SELECTITEM[] = [
];
const memberTypes: SELECTITEM[] = [
];
const schoolTypes: SELECTITEM[] = [
];

const followUpStatuses: SELECTITEM[] = [
  { value: '2092', label: 'Open' },
  { value: '2104', label: 'Closed' },
];

const highlightStatuses: SELECTITEM[] = [
];

const academicYearTypes: SELECTITEM[] = [];

const countryList: SELECTITEM[] = [];

export const constants = {
  joinedYears,
  // non-db
  gradYears,
  contactYears,
  ssrDateRange,
  currentContactYear,
  currentContactMonth,
  months,
  qrPeriods,
  gradesProcessingPeriods,

  genders,
  emojis,

  // db
  languageStatuses,
  memberStatuses,
  schoolTypes,
  studentStatuses,
  reviewedQRStatuses,
  reviewedStatuses,
  memberTypes,
  followUpStatuses,
  highlightStatuses,
  academicYearTypes,
  countryList
};
