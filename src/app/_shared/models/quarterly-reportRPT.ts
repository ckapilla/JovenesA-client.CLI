export class QRMini {
  constructor(
    public quarterlyReportGUId?: string,
    public reportYear?: number,
    public reportPeriod?: number,
    public studentGUId?: string,
    public sponsorGroupId?: string,
    public reportDateTime?: string,
    public reviewedStatusId?: number,
    public studentName?: string,
    public studentStatus?: string,
    public sponsorGroupName?: string,
    public highlightStatusId?: number,
    public hasMR?: string,
    public hasSR?: string
  ) {

  }
}
