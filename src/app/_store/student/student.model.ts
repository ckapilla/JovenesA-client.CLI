import { Student } from 'src/app/_shared/models/student';

export interface StudentStateModel {
  students: Student[];
  selectedStudentGUId: string;
  photoPathname: string;
}
