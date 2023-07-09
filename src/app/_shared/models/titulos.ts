export class Titulos {
  constructor(
    public tituloId: number,
    public studentGUId: string,
    public tituloReceivedDate: Date = new Date(),
    public imageSubmittedDate?: Date
  ) {}
}
