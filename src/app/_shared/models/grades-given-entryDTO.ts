export class GradesGivenEntryDTO {
  constructor(
    public studentGUId: string,
    public studentName?: string, // StudentName
    public univ?: string,
    public academicYear?: string,
    public gradeMonths?: string,
    // public year?: number, // temp holdover
    // public periodNumber?: number, // temp holdover
    public gradesGivenDate?: Date,
    public gradesGivenYear?: number,
    public gradesGivenMonth?: number,
    public gradesDueDate?: Date,
    public gradesTurnedInDate?: Date,
    public gradePointAvg?: number,
    public exception?: string,
    public gradesTurnedInStatus?: string,
    public gradePointAvgStatus?: string,
    public confirmedDate?: number,
    public imageSubmittedDate?: Date
  ) {}
}
