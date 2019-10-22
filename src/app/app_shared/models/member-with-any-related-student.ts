export class MemberWithAnyRelatedStudent {

  constructor(
    public memberId: number,
    public lastNames: string,
    public firstNames: string,
    public email: string,

    public memberType: string,
    public memberStatusId: number,
    public memberStatus: string,

    public relatedStudentId?: number,
    public relatedStudentName?: string,
    public relatedStudentStatusId?: number,
    public relatedStudentStatus?: string,
    public relatedStudentGUId?: string,
    public memberGUId?: string
  ) { }
}
