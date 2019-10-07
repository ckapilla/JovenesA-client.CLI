export class StudentHeaderDTO {

  constructor(
    public studentId: number, // StudentID (Primary key)
    public firstNames: string,
    public studentName: string, // StudentName
    public yearJoinedJa?: number, // YearJoinedJA
    public statusId?: number, // StatusID
    public gradYear?: number, // GradYear
    public gradMonth?: string, // GradMonth
    public gradMonthNum?: number,
    public photoUrl?: string,
    public sponsorGroupName?: string,
    public mentorName?: string,
    public universityName?: string,
    public major?: string,
    public studentGUId?: string

  ) { }
}
