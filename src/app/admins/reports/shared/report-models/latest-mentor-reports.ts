export class LatestMentorReports {

  constructor(

    public mentorId: number,
    public studentId: number,
    public mentorName: string,
    public mentorEmail: string,
    public mentorPhone: string,
    public studentName: string,
    public studentEmail: string,
    public studentPhone: string,
    public mentorReportSnapshot: number,
    public latestMonth: string,
    public reportDate: string,
    public reportDateTime?: Date

  ) {}
}
