var Communication = (function () {
    function Communication(communicationId, // MemberCommunicationID (Primary key)
        communicationDateTime, memberId, methodId, categoryId, campaignId, relatedStudentId, outcomeId, comments, updateDtTm) {
        this.communicationId = communicationId;
        this.communicationDateTime = communicationDateTime;
        this.memberId = memberId;
        this.methodId = methodId;
        this.categoryId = categoryId;
        this.campaignId = campaignId;
        this.relatedStudentId = relatedStudentId;
        this.outcomeId = outcomeId;
        this.comments = comments;
        this.updateDtTm = updateDtTm;
    }
    return Communication;
}());
export { Communication };
//# sourceMappingURL=communication.js.map