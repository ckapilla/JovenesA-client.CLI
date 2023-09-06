export class Titulos {
  constructor(
    public tituloId: number,
    public studentGUId: string,
    public tituloIssuedDate: Date,
    public tituloUploadedDate?: Date
  ) {}
}
