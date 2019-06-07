export class FollowUpEventRPT {
  constructor(
    FollowUpEventId: number,
    FollowUpRequestId: number | null,
    EnteredById: number | null,
    EnteredBy: string ,
    AssignedToId: number | null,
    AssignedTo: string,
    AssignedToRoleId: number| null,
    AssignedToRole: string,
    RequestStatusId: number | null,
    RequestStatus: string,
    Comments_English: string,
    Comments_Spanish: string,
    EventDateTime: Date | string | null
  ) { }
}