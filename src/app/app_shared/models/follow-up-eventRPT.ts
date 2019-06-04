export class FollowUpEventRPT {
  constructor(
    FollowUpEventId: number,
    FollowUpRequestId: number | null,
    EnteredById: number | null,
    AssignedToId: number | null,
    AssignedTo: string,
    RequestStatusId: number | null,
    RequestStatus: string,
    Comments_English: string,
    Comments_Spanish: string,
    EventDateTime: Date | string | null,
    EnteredBy: string
  ) { }
}
