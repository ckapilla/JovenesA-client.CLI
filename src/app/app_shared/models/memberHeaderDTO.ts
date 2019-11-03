export class MemberHeaderDTO {

  constructor(
    public memberId: number,
    public memberName: string,
    public yearJoinedJa?: number, // YearJoinedJA
    public memberGUId?: string,
    public email?: string,
    public photoUrl?: string,
    public adminStatusId?: number,
    public mentorStatusId?: number,
    public sponsorStatusId?: number,
    public studentId?: number,

  ) { }
}
