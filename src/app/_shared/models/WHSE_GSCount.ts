export class WHSE_GSCount {

  constructor(
    public academicYearType: string,
    public gradesProcessingPeriodID: number,
    public formattedPeriodStartDate: string,
    public gradesSubmittedCount: number,
    public gradesNotSubmittedCount: number
  ) { }
}
