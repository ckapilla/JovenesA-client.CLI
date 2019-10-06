export class QuarterlyReport {
  constructor(
    public quarterlyReportId?: number,
    public reportYear?: number,
    public reportPeriod?: number,
    public studentGUId?: string,
    public sponsorGroupGUId?: string,
    public jA_Narrative_English?: string,
    public jA_Narrative_Spanish?: string,
    public sR_Narrative_English?: string,
    public sR_Narrative_Spanish?: string,
    public mR_Narrative_English?: string,
    public mR_Narrative_Spanish?: string,
    public reportDateTime?: string,
    public reviewedStatusId?: number
  ) {

  }
}
