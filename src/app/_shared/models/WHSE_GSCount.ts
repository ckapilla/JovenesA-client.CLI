export class WHSE_GSCount {

  constructor(
    public academicYearType: string,
    public academicTermId: number,
    public formattedPeriodStartDate: string,
    public gradesSubmittedCount: number,
    public gradesNotSubmittedCount: number
  ) { }
}
