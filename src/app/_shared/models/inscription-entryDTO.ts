export class InscriptionEntryDTO {
  constructor(
    public studentGUId: string,
    public inscriptionId: number,
    public studentName?: string, // StudentName
    public univ?: string,
    public academicYear?: string,

    public gradesProcessingPeriodId?: number,
    public initialGradesEntryDate?: Date,
    public inscriptionsDueDate?: Date,
    public inscriptionsTurnedInDate?: Date,

    public registrationFormSubmittedDate?: Date,
    public paymentReceiptSubmittedDate?: Date,
    public confirmedDate?: Date,
    public confirmedById?: number,
  ) {}
}
