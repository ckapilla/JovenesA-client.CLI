export class FollowUpRequest {
  constructor(
    public followUpRequestId?: number,
    public requestorId?: number | null,
    public requestorRoleId?: number | null,
    public description_English?: string,
    public description_Spanish?: string,
    public requestDateTime?: Date | string | null,
    public studentGUId?: string
  ) {}
}
