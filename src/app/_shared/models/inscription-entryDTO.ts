export class InscriptionEntryDTO {
  constructor(
    public studentGUId: string,
    public inscriptionId: number,
    public studentName?: string, // StudentName
    public univ?: string,
    public academicYear?: string,

    public academicTermId?: number,
    public inscriptionsEntryStartDate?: string,
    public inscriptionsEntryEndDate?: string,
    public inscriptionsTurnedInDate?: string,

    public registrationFormSubmittedDate?: Date,
    public paymentReceiptSubmittedDate?: Date,
    public confirmedDate?: Date,
    public confirmedById?: number,
  ) {}
}
