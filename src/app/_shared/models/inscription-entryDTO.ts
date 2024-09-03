export class InscriptionEntryDTO {
  constructor(
    public studentGUId: string,
    public inscriptionId: number,
    public studentName?: string, // StudentName
    public univ?: string,
    public academicYear?: string,

    public academicTermId?: number,
    public inscriptionsEntryStartDate?: Date,
    public inscriptionsEntryEndDate?: Date,
    public inscriptionsTurnedInDate?: Date,

    public registrationFormSubmittedDate?: Date,
    public paymentReceiptSubmittedDate?: Date,
    public confirmedDate?: Date,
    public confirmedById?: number,
  ) {}
}
