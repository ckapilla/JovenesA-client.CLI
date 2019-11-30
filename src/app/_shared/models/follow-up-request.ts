export class FollowUpRequest {

  constructor(
    public followUpRequestId?: number,
    public studentId?: number | null,
    public requestorId?: number | null,
    public requestorRoleId?: number | null,
    public targetDate?: Date | string | null,
    public description_English?: string,
    public description_Spanish?: string,
    public requestDateTime?: Date | string | null,
    public studentGUId?: string,
  ) { }
}
