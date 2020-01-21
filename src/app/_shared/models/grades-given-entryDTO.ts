export class GradesGivenEntryDTO {

  constructor(
    public studentId: number, // StudentID (Primary key)
    public studentGUId: string,
    public studentName?: string, // StudentName
    public univ?: string,
    public academicYear?: string,
    public gradeMonths?: string,
    public year?: number,
    public periodNumber?: number,
    public gradesGiven?: Date,
    public gradesDue?: Date,
    public gradesTurnedIn?: Date,
    public gradePointAvg?: number
  ) { }
}
