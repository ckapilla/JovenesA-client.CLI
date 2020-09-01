export class Communication {

  constructor(
    public communicationId: number, // MemberCommunicationID (Primary key)
    public communicationDateTime: Date,
    public memberId: number,
    public methodId: number,
    public categoryId: number,
    public campaignId?: number,
    public relatedStudentId?: number,
    public outcomeId?: number,
    public comments?: string,
    public updateDtTm?: Date
  ) {}
}
