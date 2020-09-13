export class GradesGivenEntryDTO {
  constructor(
    public studentGUId: string,
    public studentName?: string, // StudentName
    public univ?: string,
    public academicYear?: string,
    public gradeMonths?: string,
    public year?: number,
    public periodNumber?: number,
    public gradesGivenDate?: Date,
    public gradesDueDate?: Date,
    public gradesTurnedInDate?: Date,
    public gradePointAvg?: number,
    public becaApproved?: number,
    public gradesTurnedInException?: string,
    public gradePointAvgException?: string,
    public gradesTurnedInStatus?: string,
    public gradePointAvgStatus?: string
  ) {}
}
