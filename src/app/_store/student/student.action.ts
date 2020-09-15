import { StudentStateModel } from './student.model';

export interface StudentIdentifiers {
  studentGUId: string;
  studentName: string;
}

export class GetStudents {
  static readonly type = '[Student Lookup Component] Get Students';
  constructor(public payload: StudentStateModel) {}
}

export class SetSelectedStudentIdentifiers {
  static readonly type = '[Student Selection] update studentIdentifiers';
  // constructor(public readonly {guid, name}: { guid: string, name: string} ) {}
  constructor(public readonly payload: StudentIdentifiers) {}
}

export class SetSelectedStudentGUId {
  static readonly type = '[Student Selection] update studentGUId';
  constructor(public readonly payload: string) {}
}

// export class SetSelectedStudentName {
//   static readonly type = '[Student Selection] update studentName';
//   constructor(public readonly payload: string) {}
// }

export class SetPhotoPathname {
  static readonly type = '[Student Header] update photoPathname';
  constructor(public readonly payload: string) {}
}
