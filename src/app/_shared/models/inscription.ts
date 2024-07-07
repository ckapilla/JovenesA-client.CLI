export class Inscription {
  constructor(
    public inscriptionId: number,
    public studentGUId: string,
    public year: number, // temp holdover
    public gradesProcessingPeriodId: number,
    public initialInscriptionsEntryDate: Date = new Date(),
    public inscriptionsDueDate: Date = new Date(),

    public registrationFormSubmittedDate?: Date,
    public paymentReceiptSubmittedDate?: Date,
    public confirmedDate?: Date,
    public confirmedById?: number,

  ) {}
}
