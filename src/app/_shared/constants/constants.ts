import { GRADESPROCESSINGPERIOD } from '../interfaces/GRADESPROCESSINGPERIOD';
import { SELECTITEM } from '../interfaces/SELECTITEM';
const joinedYears: SELECTITEM[] = [
//   { value: '2021', label: '2021' },
//   { value: '2020', label: '2020' },
//   { value: '2019', label: '2019' },
//   { value: '2018', label: '2018' },
//   { value: '2017', label: '2017' },
//   { value: '2016', label: '2016' },
//   { value: '2015', label: '2015' },
//   { value: '2014', label: '2014' },
//   { value: '2013', label: '2013' },
//   { value: '2012', label: '2012' },
//   { value: '2011', label: '2011' },
//   { value: '2010', label: '2010' },
//   { value: '2009', label: '2009' },
//   { value: '2008', label: '2008' },
//   { value: '2007', label: '2007' },
//   { value: '2006', label: '2006' },
//   { value: '2005', label: '2005' },
//   { value: '2004', label: '2004' },
//   { value: '2003', label: '2003' },
//   { value: '2002', label: '2002' }
];
const gradYears: SELECTITEM[] = [
//   { value: '2026', label: '2026' },
//   { value: '2025', label: '2025' },
//   { value: '2024', label: '2024' },
//   { value: '2023', label: '2023' },
//   { value: '2022', label: '2022' },
//   { value: '2021', label: '2021' },
//   { value: '2020', label: '2020' },
//   { value: '2019', label: '2019' },
//   { value: '2018', label: '2018' },
//   { value: '2017', label: '2017' },
//   { value: '2016', label: '2016' },
//   { value: '2015', label: '2015' },
//   { value: '2014', label: '2014' },
//   { value: '2013', label: '2013' },
//   { value: '2012', label: '2012' },
//   { value: '2011', label: '2011' },
//   { value: '2010', label: '2010' },
//   { value: '2009', label: '2009' },
//   { value: '2008', label: '2008' },
//   { value: '2007', label: '2007' },
//   { value: '2006', label: '2006' },
//   { value: '2005', label: '2005' },
//   { value: '2004', label: '2004' }
];
const contactYears: SELECTITEM[] = [
  // { value: '2017', label: '2017' },
  // { value: '2018', label: '2018' },
  // { value: '2019', label: '2019' },
  // { value: '2020', label: '2020' },
  // { value: '2021', label: '2021' }
];
const currentContactYear  = 2022;


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
// const periods: SELECTITEM[] = [
//   { value: '1', label: '1:Ene-Mar' },
//   { value: '2', label: '2:Abr-Jun' },
//   { value: '3', label: '3:Jul-Set' },
//   { value: '4', label: '4:Oct-Dic' }
// ];
// const qrPeriods: SELECTITEM[] = [
//   { value: '2019-3', label: '2019 3:Jul-Set' },
//   { value: '2019-4', label: '2019 4:Oct-Dic' },
//   { value: '2020-1', label: '2020 1:Ene-Mar' },
//   { value: '2020-2', label: '2020 2:Abr-Jun' },
//   { value: '2020-3', label: '2020 3:Jul-Set' },
//   { value: '2020-4', label: '2020 4:Oct-Dic' },
//   { value: '2021-1', label: '2021 1:Ene-Mar' },
//   { value: '2021-2', label: '2021 2:Abr-Jun' },
// ];
const qrPeriods: SELECTITEM[] = [];

// const gradesProcessingPeriods: SELECTITEM[] = [
//   { value: '101', label: '2020-12-01 (Cuatrimestre)' },
//   { value: '102', label: '2020-12-01 (Semestre)' },
//   { value: '103', label: '2021-04-01 (Cuatrimestre)' },
//   { value: '104', label: '2021-07-01 (Semester)' },
//   { value: '105', label: '2021-08-01 (Cuatrimestre)' }// ,
//   // { value: '106', label: '2021-12-01 : 2022-03-31' },
//   // { value: '107', label: '2021-12-01 : 2022-06-30' },


//   // { value: '101', label: '2020-12-01 : 2021-03-31' },
//   // { value: '102', label: '2020-12-01 : 2021-06-30' },
//   // { value: '103', label: '2021-04-01 : 2021-07-31' },
//   // { value: '104', label: '2021-07-01 : 2021-11-30' },
//   // { value: '105', label: '2021-08-01 : 2021-11-30' }// ,
//   // // { value: '106', label: '2021-12-01 : 2022-03-31' },
//   // // { value: '107', label: '2021-12-01 : 2022-06-30' },
// ];

// const gradesProcessingPeriods: GRADESPROCESSINGPERIOD[] = [
//   { id: '101', descriptor: '2021-01-01 (Cuatrimestre)', startDate:'2020-12-01', entryDate:'2021-01-01',  endDate:'2021-03-31', yearTypeId: 2032 },
//   { id: '102', descriptor: '2021-01-01 (Semestre)', startDate:'2020-12-01', entryDate:'2021-01-01' ,endDate:'2021-06-30', yearTypeId: 2031 },
//   { id: '103', descriptor: '2021-05-01 (Cuatrimestre)', startDate:'2021-04-01', entryDate:'2021-05-01',endDate:'2021-07-31', yearTypeId: 2032 },
//   { id: '104', descriptor: '2021-08-01 (Semestre)', startDate:'2021-07-01', entryDate:'2021-08-01', endDate:'2021-11-30', yearTypeId: 2031  },
//   { id: '105', descriptor: '2021-09-01 (Cuatrimestre)', startDate:'2021-08-01', entryDate:'2021-09-01', endDate:'2021-11-30', yearTypeId: 2032},
//   { id: '106', descriptor: '2021-08-01 (Semestre)', startDate:'2021-12-01', entryDate:'2021-12-20', endDate:'2022-03-31', yearTypeId: 2032  },
//   { id: '107', descriptor: '2021-09-01 (Cuatrimestre)', startDate:'2021-12-01', entryDate:'2021-12-20', endDate:'2022-06-30', yearTypeId: 2031}
// ];

const gradesProcessingPeriods: GRADESPROCESSINGPERIOD[] = [
  { id: '101', descriptor: '2021-01-01 (Cuatrimestre)', studentReportingStartDate:'2020-12-20',  endDate:'2021-03-31', yearTypeId: 2032, isCurrent: false },
  { id: '102', descriptor: '2021-01-01 (Semestre)', studentReportingStartDate:'2020-12-20', endDate:'2021-06-30', yearTypeId: 2031, isCurrent: false},
  { id: '103', descriptor: '2021-05-01 (Cuatrimestre)', studentReportingStartDate:'2021-04-20', endDate:'2021-07-31', yearTypeId: 2032, isCurrent: false },
  { id: '104', descriptor: '2021-08-01 (Semestre)', studentReportingStartDate:'2021-07-20', endDate:'2021-11-30', yearTypeId: 2031, isCurrent: false  },
  { id: '105', descriptor: '2021-09-01 (Cuatrimestre)', studentReportingStartDate:'2021-08-20', endDate:'2021-11-30', yearTypeId: 2032, isCurrent: false},
  { id: '106', descriptor: '2022-01-01 (Cuatrimestre)', studentReportingStartDate:'2021-12-20', endDate:'2022-03-31', yearTypeId: 2032, isCurrent: true },
  { id: '107', descriptor: '2022-01-01 (Semestre)', studentReportingStartDate:'2021-12-20', endDate:'2022-06-30', yearTypeId: 2031, isCurrent: false}
];

const genders: SELECTITEM[] = [
  { value: 'M', label: 'Male/Hombre' },
  { value: 'F', label: 'Female/Mujer' }
];
const smileys = [
  '/assets/images/needsAttention.jpg',
  '/assets/images/thumbsUp.jpg',
  '/assets/images/celebrate.jpg',
  '/assets/images/NA.jpg'
];
const emojis = smileys;

// interface CODEVALUE {
//   codeValueId: number;   codeSet: string; stringValue: string; intValue: number;
// }

const languageStatuses: SELECTITEM[] = [
  // { value: '1024', label: 'None' },
  // { value: '1025', label: 'Basic' },
  // { value: '1026', label: 'Intermediate' },
  // { value: '1027', label: 'Advanced' },
  // { value: '1028', label: 'Native' }
];

const studentStatuses: SELECTITEM[] = [
  // { value: '1003', label: 'Dropped' },
  // { value: '1004', label: 'Grad' },
  // { value: '1005', label: 'Current' },
  // { value: '1006', label: 'Service' },
  // { value: '2146', label: 'Sabbatical' },
  // { value: '2152', label: 'Pending' },
];
const memberStatuses: SELECTITEM[] = [
  // { value: '1015', label: 'Active' },
  // { value: '1016', label: 'Inactive Temporary' },
  // { value: '1017', label: 'Inactive Permanent' },
  // { value: '2055', label: 'Deceased' }
];
const reviewedStatuses: SELECTITEM[] = [
  // { value: '2086', label: 'NeedsSetup' },
  // { value: '2087', label: 'NeedsReview' },
  // { value: '2147', label: 'Ready For QR' },
  // { value: '2148', label: 'Copied To QR' },
  // { value: '2090', label: 'Skipped' }
];
const reviewedQRStatuses: SELECTITEM[] = [
  // { value: '2086', label: 'NeedsSetup (CK)' },
  // { value: '2087', label: 'NeedsReview (DK)' },
  // { value: '2088', label: 'ReadyToSend/single' },
  // { value: '2089', label: 'Sent' },
  // { value: '2090', label: 'On Hold (DK)' },
  // { value: '2129', label: 'ReadyToSend/CC' },
  // { value: '2130', label: 'ReadyToSend/UU' },
  // { value: '2149', label: 'ReadyToSend/Amistad' },
  // { value: '2131', label: 'ReadyToSend/NoEmail' },
  // { value: '2132', label: 'On Hold/AmistadPool' },
  // { value: '2133', label: 'Sent/Bounced' },
];
const memberTypes: SELECTITEM[] = [
  // { value: '2068', label: 'Admin' },
  // { value: '1012', label: 'Employee' },
  // { value: '1010', label: 'Mentor' },
  // { value: '2041', label: 'Pledger' },
  // { value: '1009', label: 'Sponsor' },
  // { value: '1008', label: 'Volunteer' }
];
const schoolTypes: SELECTITEM[] = [
  // { value: '2056', label: 'Prepa' },
  // { value: '2057', label: 'University' },
  // { value: '2058', label: 'N/A' }
];

const followUpStatuses: SELECTITEM[] = [
  // { value: '2092', label: 'Assigned' },
  // { value: '2104', label: 'Closed' },
];
const highlightStatuses: SELECTITEM[] = [
  // { value: '0', label: '' },
  // { value: '2105', label: 'Problems' },
  // { value: '2106', label: 'GoodNews' },
];

const academicYearTypes: SELECTITEM[] = [];

const countryList: SELECTITEM[] = [];

export const constants = {
  joinedYears,
  // non-db
  gradYears,
  contactYears,
  currentContactYear,
  months,
  qrPeriods,
  gradesProcessingPeriods,

  genders,
  smileys,
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
