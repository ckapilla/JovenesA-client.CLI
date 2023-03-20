export class WHSE_QRCount {

  constructor(
    public yearPeriod: string,
    public waiting: number,
    public needsReview: number,
    public onHold: number,
    public sent: number,
    public other: number,
  ) { }
}
