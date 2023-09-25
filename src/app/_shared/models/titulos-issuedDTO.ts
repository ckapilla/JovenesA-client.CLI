export class TitulosIssuedDTO {
  constructor(


    // public tituloId: number,
    public studentGUId: string,
    public studentName?: string, // StudentName
    public gradYear?: number,
    public tituloIssuedDate?: Date,
    public tituloUploadedDate?: Date
  ) {}
}
