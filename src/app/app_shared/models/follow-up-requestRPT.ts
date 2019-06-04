export class FollowUpRequestRPT {
  constructor(
    public followUpRequestId?: number,
    public studentId?: number | null,
    public requestorId?: number | null,
    public requestorRoleId?: number | null,
    public targetDate?: Date | string | null,
    public description_English?: string,
    public description_Spanish?: string,
    public requestDateTime?: Date | string | null,
    public latestFollowUpEventId?: number,
    public assignedToId?: number | null,
    public requestStatusId?: number | null,
    public eventDateTime?: Date | string | null,
    public studentName?: string,
    public assignedTo?: string,
    public requestedByRole?: string,
    public requestedBy?: string,
    public requestStatus?: string,
  ) { }
}
