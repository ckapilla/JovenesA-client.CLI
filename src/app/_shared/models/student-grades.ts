export class StudentGrades {
  constructor(
    public studentGradeId: number,
    public studentGUId: string,
    public year: number, // temp holdover
    public periodNumber: number, // temp holdover
    public academicTermId: number,
    public gradesEntryStartDate: Date = new Date(),
    // public gradesGivenYear?: number,
    // public gradesGivenMonth?: number,
    public gradesEntryEndDate: Date = new Date(),
    public gradesTurnedInDate: Date = new Date(),
    public gradePointAvg?: number,
    public exception: string = '',
    public confirmedById?: number,
    public confirmedDate?: Date,
    public imageSubmittedDate?: Date
  ) {}
}
