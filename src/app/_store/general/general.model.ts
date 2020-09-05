import { Member } from 'src/app/_shared/models/member';
import { Student } from 'src/app/_shared/models/student';

export interface GeneralStateModel {
  student: {
    students: Student[];
    selectedStudentGUId: string;
  },
  member: {
    members: Member[];
    selectedMemberGUId: string;
  },
  ui: {
    testNamesVisibility: boolean,
    studentListFilters: {
      studentStatus: number,
      gradYear: number,
      gradMonthNum: number,
      activeStatus: number
    },
    memberListFilters: {
      memberType: string,
      memberStatus: number,
      relatedStudentStatus: number
    },
    qrCurrentPeriod: {
      currentPeriod: number
    }


  }

}
