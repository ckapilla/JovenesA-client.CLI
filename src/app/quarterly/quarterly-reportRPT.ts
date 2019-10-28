export class QuarterlyReportRPT {
  constructor(
    public quarterlyReportGUId?: string,
    public reportYear?: number,
    public reportPeriod?: number,
    public studentGUId?: string,
    public sponsorGroupGUId?: string,
    public reportDateTime?: string,
    public reviewedStatusId?: number,
    public studentName?: string,
    public studentStatus?: string,
    public sponsorGroupName?: string,
    public highlightStatusId?: number
  ) {

  }
}
