export class TitulosReceivedDTO {
  constructor(


    public tituloId: number,
    public studentGUId: string,
    public studentName?: string, // StudentName
    public gradYear?: number,
    public tituloReceivedDate?: Date,
    public tituloUploadedDate?: Date
  ) {}
}
