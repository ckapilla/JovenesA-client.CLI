export class FollowUpRequest {

  constructor(
    public followUpRequestId: number,
    public studentId: number | null,
    public requestedByPersonId: number | null,
    public requestedByPersonTypeId: number | null,
    public targetDate: Date | string | null,
    public description_English: string,
    public description_Spanish: string,
    public assignedToPersonId: number | null,
    public statusID: number,
    public createdDateTime: Date | string | null,
    public lastUpdateDateTime: Date | string | null
  ) {}
}
