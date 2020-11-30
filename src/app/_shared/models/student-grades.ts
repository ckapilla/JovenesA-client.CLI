export class StudentGrades {
  constructor(
    public studentGradeId: number,
    public studentGUId: string,
    public gradesGivenDate: Date = new Date(),
    public gradesDueDate: Date = new Date(),
    public gradesTurnedInDate: Date = new Date(),
    public gradePointAvg?: number,
    public gradesTurnedInException: string = '',
    public gradePointAvgException: string = '',
    public GPAConfirmedById?: number,
    public GPAConfirmedDate?: Date,
    public GPAConfirmedState?: number
  ) {}
}
