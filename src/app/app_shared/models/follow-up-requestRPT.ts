export class FollowUpRequestRPT {
  constructor(
    public followUpRequestID: number,
    public studentID: number | null,
    public requestedByID: number | null,
    public requestedByRoleID: number | null,
    public targetDate: Date | string | null,
    public description_English: string,
    public description_Spanish: string,
    public requestDateTime: Date | string | null,
    public latestFollowUpEventId: number,
    public assignedToID: number | null,
    public requestStatusID: number | null,
    public eventDateTime: Date | string | null,
    public studentName: string,
    public assignedTo: string,
    public requestedByRole: string,
    public requestedBy: string,
    public requestStatus: string,
  ) { }
}
