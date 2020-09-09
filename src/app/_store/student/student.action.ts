import { StudentStateModel } from './student.model';

export class GetStudents {
  static readonly type = '[Student Lookup Component] Get Students';
  constructor(public payload: StudentStateModel) {}
}
// export class GetPhotoPathname {
//   static readonly type = '[Student Photo] Get PhotoPathname';
//   constructor(public payload: StudentStateModel) {}
// }

export class SetSelectedStudentGUId {
  static readonly type = '[Student Selection] update studentGUId';
  constructor(public readonly payload: string) {}
}

export class SetPhotoPathname {
  static readonly type = '[Student Header] update photoPathname';
  constructor(public readonly payload: string) {}
}
