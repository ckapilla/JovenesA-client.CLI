export class ConfidentialReportRPT {

  constructor(
    public confidentialReportId?: number,
    public adminId?: number,
    //public studentId?: number,
    public admiName?: string,
    public studentName?: string,
    public reportDateTime?: Date,
    public lastContactYear?: number,
    public lastContactMonth?: number,
    public emoji?: number,
    public narrative_English?: string,
    public narrative_Spanish?: string,
    public reviewedStatusId?: number,
    public reviewedStatus?: string,
    public sponsorGroupName?: string,
    public studentGUId?: string
  ) {

  }
}
