export class TitulosCandidateDTO {
  constructor(
    public studentGUId: string,
    public studentName?: string, // StudentName
    public gradYear?: number,
    public tituloId?: number,
    public tituloIssuedDate?: Date,
    public tituloUploadedDate?: Date
  ) {}
}
