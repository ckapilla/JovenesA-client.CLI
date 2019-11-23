export class ConfidentialReportRPT {
  constructor(
    public confidentialReportGUId?: string,
    public adminId?: number,
    public studentId?: number,
    public adminName?: string,
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
    public originalLanguageId?: number,
    public sponsorRequiredLanguageId?: number,
    public sponsorPreferredLanguageId?: number,
    public studentGUId?: string
  ) {

  }
}
