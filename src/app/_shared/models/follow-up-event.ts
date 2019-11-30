export class FollowUpEvent {
  constructor(
    public followUpEventId?: number,
    public followUpRequestId?: number,
    public enteredById?: number | null,
    public assignedToRoleId?: number | null,
    public assignedToId?: number | null,
    public requestStatusId?: number | null,
    public comments_English?: string,
    public comments_Spanish?: string,
    public eventDateTime?: Date | string | null,
  ) { }
}
