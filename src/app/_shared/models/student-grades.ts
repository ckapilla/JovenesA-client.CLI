export class StudentGrades {
  constructor(
    public studentGradeId: number,
    public studentGUId: string,
    public gradesGivenDate?: Date,
    public gradesDueDate?: Date,
    public gradesTurnedInDate?: Date,
    public gradePointAvg?: number,
    public gradesTurnedInException?: string,
    public gradePointAvgException?: string
  ) {}
}
