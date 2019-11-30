export class FollowUpEventRPT {
  constructor(
    public followUpEventId: number,
    public followUpRequestId: number | null,
    public enteredById: number | null,
    public enteredBy: string ,
    public assignedToId: number | null,
    public assignedTo: string,
    public assignedToRoleId: number| null,
    public assignedToRole: string,
    public requestStatusId: number | null,
    public requestStatus: string,
    public comments_English: string,
    public comments_Spanish: string,
    public eventDateTime: Date | string | null
  ) { }
}
