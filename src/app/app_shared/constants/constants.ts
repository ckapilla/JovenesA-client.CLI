
import { SELECTITEM } from '../interfaces/SELECTITEM';

const languageStatuses: SELECTITEM[] = [
  { value: '1024', label: 'None' },
  { value: '1025', label: 'Basic' },
  { value: '1026', label: 'Intermediate' },
  { value: '1027', label: 'Advanced' },
  { value: '1028', label: 'Native' }
];
const schoolTypes: SELECTITEM[] = [
  { value: '0', label: '' },
  { value: '2056', label: 'Prepa' },
  { value: '2057', label: 'Univ' },
  { value: '2058', label: 'N/A' }
];
const joinedYears: SELECTITEM[] = [
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
  { value: '2013', label: '2013' },
  { value: '2012', label: '2012' },
  { value: '2011', label: '2011' },
  { value: '2010', label: '2010' },
  { value: '2009', label: '2009' },
  { value: '2008', label: '2008' },
  { value: '2007', label: '2007' },
  { value: '2006', label: '2006' },
  { value: '2005', label: '2005' },
  { value: '2004', label: '2004' },
  { value: '2003', label: '2003' },
  { value: '2002', label: '2002' }
];
const gradYears: SELECTITEM[] = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
  { value: '2013', label: '2013' },
  { value: '2012', label: '2012' },
  { value: '2011', label: '2011' },
  { value: '2010', label: '2010' },
  { value: '2009', label: '2009' },
  { value: '2008', label: '2008' },
  { value: '2007', label: '2007' },
  { value: '2006', label: '2006' },
  { value: '2005', label: '2005' },
  { value: '2004', label: '2004' },
];
const years: SELECTITEM[] = [
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' }
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
const studentStatuses: SELECTITEM[] = [
  { value: '1003', label: 'Dropped' },
  { value: '1004', label: 'Grad' },
  { value: '1005', label: 'Current' }
];
const memberStatuses: SELECTITEM[] = [
  { value: '1015', label: 'Active' },
  { value: '1016', label: 'Inactive Temporary' },
  { value: '1017', label: 'Inactive Permanent' },
  { value: '2055', label: 'Deceased' }
];
const memberTypes: SELECTITEM[] = [
  { value: '2068', label: 'Admin' },
  { value: '1012', label: 'Employee' },
  { value: '1010', label: 'Mentor' },
  // { value: '2072', label: 'NonPerson' },
  { value: '2041', label: 'Pledger' },
  // { value: '2040', label: 'President' },
  // { value: '2067', label: '[All]' },
  { value: '1009', label: 'Sponsor' },
  // { value: '2069', label: 'Student' },
  { value: '1008', label: 'Volunteer' }
];
const joinedFromTypes: SELECTITEM[] = [
  { value: '2056', label: 'Prepa' },
  { value: '2057', label: 'University' },
  { value: '2058', label: 'N/A' }
];
const genders: SELECTITEM[] = [
  { value: 'M', label: 'Male/Hombre' },
  { value: 'F', label: 'Female/Mujer' },
];
const smileys = ['/assets/images/needsAttention.jpg',
  '/assets/images/thumbsUp.jpg',
  '/assets/images/celebrate.jpg',
  '/assets/images/NA.jpg'
];

export const constants = {
  languageStatuses,
  schoolTypes,
  joinedYears,
  gradYears,
  years,
  months,
  studentStatuses,
  memberStatuses,
  memberTypes,
  joinedFromTypes,
  genders,
  smileys
};
