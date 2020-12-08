export class StudentGrades {
  constructor(
    public studentGradeId: number,
    public studentGUId: string,
    public gradesGivenDate: Date = new Date(),
    public gradesDueDate: Date = new Date(),
    public gradesTurnedInDate: Date = new Date(),
    public gradePointAvg?: number,
    public exception: string = '',
    public confirmedById?: number,
    public confirmedDate?: Date
  ) {}
}
