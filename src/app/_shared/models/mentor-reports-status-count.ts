export class MentorReportsStatusCount {

  constructor(
    public reportYear: number,
    public reportMonth: number,
    public reviewedStatusId: number,
    public reviewedStatus: string,
    public statusCount: number
  ) { }
}
