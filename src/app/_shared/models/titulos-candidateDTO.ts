export class TitulosCandidateDTO {
  constructor(
    public studentGUId: string,
    public studentName?: string, // StudentName
    public gradYear?: number,
    public tituloId?: number,
    public tituloReceivedDate?: Date,
    public imageSubmittedDate?: Date
  ) {}
}
