export class FollowUpRequestRPT {
  constructor(
    public followUpRequestId?: number,
    public latestFollowUpEventId?: number,
    public studentId?: number | null,
    public requestorId?: number | null,
    public assignedToId?: number | null,
    // public requestorRoleId?: number | null,
    public targetDate?: Date | string | null,
    public description_English?: string,
    public description_Spanish?: string,
    public requestDateTime?: Date | string | null,
    //  public requestStatusId?: number | null,
    public eventDateTime?: Date | string | null,
    public requestStatus?: string,
    public studentName?: string,
    public requestorRole?: string,
    public requestorName?: string,
    public assignedToRole?: string,
    public assignedTo?: string,
    public comments_English?: string,
    public comments_Spanish?: string
  ) { }
}
