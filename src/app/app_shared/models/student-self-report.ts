export class StudentSelfReport {
  constructor(
    public studentSelfReportId?: number,
    public studentId?: number,
    public sponsorGroupId?: number,
    public reportDateTime?: Date,
    public reportYear?: number,
    public reportPeriod?: number,
    public reportText_English?: string,
    public reportText_Spanish?: string
  ) {

  }
}
