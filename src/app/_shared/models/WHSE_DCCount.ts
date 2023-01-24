export class WHSE_DCCount {

  constructor(
    public snapshotDate: string,
    public completeTotals: number,
    public droppedTotals: number,
    public percentage: number,
  ) { }
}
