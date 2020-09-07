import { StudentStateModel } from './student.model';

export class GetStudents {
  static readonly type = '[Student Lookup Component] Get Students';
  constructor(public payload: StudentStateModel) {}
}

export class SetSelectedStudentGUId {
  static readonly type = '[Student Lookup Component] update studentGUId';
  constructor(public readonly payload: string) {}
}
