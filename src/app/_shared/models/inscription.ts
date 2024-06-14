export class Inscription {
  constructor(
    public inscriptionId: number,
    public studentGUId: string,
    public year: number, // temp holdover
    public periodNumber: number, // temp holdover
    public gradesProcessingPeriodId: number,
    public initialGradesEntryDate: Date = new Date(),
    public inscriptionsDueDate: Date = new Date(),
    public inscriptionsTurnedInDate: Date = new Date(),
    public confirmedById?: number,
    public confirmedDate?: Date,
    public imageSubmittedDate?: Date
  ) {}
}
