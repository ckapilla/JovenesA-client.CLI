export class University {
  constructor (
    public universityId?: number,
    public universityAbbrev?: string | null,
    public universityName?: string | null,
    public universityCity?: string | null,
    public academicYearTypeId?: number,
    // public gradeMonthsIdXX?: number | null,
    public updtDtTm?: Date | null,
    // public timestamp?: any | null

) {}
}