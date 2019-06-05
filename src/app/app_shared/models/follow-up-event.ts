export class FollowUpEvent {
  constructor(
    FollowUpEventId: number,
    FollowUpRequestId: number | null,
    EnteredById: number | null,
    AssignedToId: number | null,
    AssignedToRoleId: number | null,
    RequestStatusId: number | null,
    Comments_English: string,
    Comments_Spanish: string,
    EventDateTime: Date | string | null,
  ) { }
}
