export class FollowUpEventRPT {
  constructor(
    FollowUpEventID: number,
    FollowUpRequestID: number | null,
    EnteredByID: number | null,
    AssignedToID: number | null,
    AssignedTo: string,
    RequestStatusID: number | null,
    RequestStatus: string,
    Comments_English: string,
    Comments_Spanish: string,
    EventDateTime: Date | string | null,
    EnteredBy: string
  ) { }
}
