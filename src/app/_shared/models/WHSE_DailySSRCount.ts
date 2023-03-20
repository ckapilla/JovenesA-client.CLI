export class WHSE_DailySSRCount {

  constructor(
    public formattedDate: string,
    public submittedDate: string,
    public submitted: number,
    public cumulative: number

  ) { }
}
