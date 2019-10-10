export class StudentSponsorXRef {
  constructor(
    public studentId: number,
    public studentName: string,
    public studentStatusId: number,
    public studentStatus: string,
    public sponsorId: number | null,
    public sponsorName: string,
    public sponsorStatusId: number,
    public sponsorStatus: string,
    public sponsorGroupId: number | null,
    public sponsorGroupName: string,
    public studentGUId: string
  ) { }
}
