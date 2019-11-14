export class StudentHeaderDTO {

  constructor(
    public studentId: number, // StudentID (Primary key)
    public studentGUId?: string,
    public studentName?: string, // StudentName
    public email?: string,
    public statusId?: number, // StatusID
    public yearJoinedJa?: number, // YearJoinedJA
    public gradYear?: number, // GradYear
    public gradMonth?: string, // GradMonth
    public gradMonthNum?: number,
    public photoUrl?: string,
    public sponsorGroupName?: string,
    public mentorName?: string,
    public universityName?: string,
    public major?: string,
  ) { }
}
