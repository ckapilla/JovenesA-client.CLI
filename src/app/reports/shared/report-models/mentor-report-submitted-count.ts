export class MentorReportSubmittedCount {

  constructor(
    public mentorName: string,
    public mentorId: string,
    public studentName: string,
    public submittedCount: number,
    public latestDate: Date
  ) { }
}
