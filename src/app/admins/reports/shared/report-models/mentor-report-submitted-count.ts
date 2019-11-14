export class MentorReportSubmittedCount {

  constructor(
    public mentorName: string,
    public mentorId: string,
    public studentName: string,
    public mentorAssignedDate: Date,
    public submittedCount: number,
    public latestDate: Date
  ) { }
}
