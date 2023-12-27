import { GRADESPROCESSINGPERIOD } from '../interfaces/GRADESPROCESSINGPERIOD';
import { SELECTITEM } from '../interfaces/SELECTITEM';

const currentContactYear: number = null;
const currentContactMonth: number = null;
const ssrDateRange: string = 'NODATEYET';

const joinedYears: SELECTITEM[] = [];
const gradYears: SELECTITEM[] = [];
const contactYears: SELECTITEM[] = [];
const pastGradYears: SELECTITEM[] = [
  { value: '2006', label: '2006' },
  { value: '2007', label: '2007' },
  { value: '2008', label: '2008' },
  { value: '2009', label: '2009' },
  { value: '2010', label: '2010' },
  { value: '2011', label: '2011' },
  { value: '2012', label: '2012' },
  { value: '2013', label: '2013' },
  { value: '2014', label: '2014' },
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
];

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
  { id: '114', descriptor: '2023-08-01 (Semestre)', studentReportingStartDate:'2023-07-22', endDate:'2023-08-31', yearTypeId: 2031, isCurrent: false },
  { id: '115', descriptor: '2023-09-01 (Cuatrimestre)', studentReportingStartDate:'2023-08-25', endDate:'2023-09-30', yearTypeId: 2032, isCurrent: false },

  { id: '116', descriptor: '2024-01-01 (Cuatrimestre)', studentReportingStartDate:'2024-01-01', endDate:'2024-01-22', yearTypeId: 2032, isCurrent: true },
  { id: '117', descriptor: '2024-01-01 (Semestre)', studentReportingStartDate:'2024-01-01', endDate:'2024-01-22', yearTypeId: 2031, isCurrent: true },


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
  pastGradYears,
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
