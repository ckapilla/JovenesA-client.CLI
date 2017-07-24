var MemberStudentRelations = (function () {
    function MemberStudentRelations(memberId, lastNames, firstNames, 
        // public FullName: string,
        relatedStudentID, relatedStudentName, 
        // public SmaAddress: string,
        //public smaPhone?: string,
        // public NonSmaAddress: string,
        // public NonSmaCity: string,
        // public NonSmaStateProvince: string,
        // public NonSmaPostalCode: string,
        // public NonSmaPhone: string,
        email
        //public monthsinSma?: string,
        // public CareerExperience: string,
        // public MentoringExperience: string,
        // public OtherRelevantLifeExperience: string,
        // public UpdateDtTm: Date,
        // public technology?: string,
        // public nonSmaCountryId?: number,
        // public mentorStatusId?: number,
        // public sponsorStatusId?: number,
        // public yearJoinedJa?: number,
        // public bestWayToContactId?: number,
        // public countryOfResidenceID?: number,
        // public spanishSkillLevelId?: number,
        // public englishSkillLevelId?: number,
        // public studentPreferenceId?: number,
        // public LastLoginDateTime?: Date,
        // public NumberOfLogins?: number
    ) {
        this.memberId = memberId;
        this.lastNames = lastNames;
        this.firstNames = firstNames;
        this.relatedStudentID = relatedStudentID;
        this.relatedStudentName = relatedStudentName;
        this.email = email;
    }
    return MemberStudentRelations;
}());
export { MemberStudentRelations };
//# sourceMappingURL=member-student-relations.js.map