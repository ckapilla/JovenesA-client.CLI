var Member = (function () {
    function Member(memberId, lastNames, firstNames, 
        // public FullName: string,
        // public SmaAddress: string,
        smaPhone, 
        // public NonSmaAddress: string,
        // public NonSmaCity: string,
        // public NonSmaStateProvince: string,
        // public NonSmaPostalCode: string,
        NonSmaPhone, email, monthsinSma, 
        // public CareerExperience: string,
        // public MentoringExperience: string,
        // public OtherRelevantLifeExperience: string,
        // public UpdateDtTm: Date,
        technology, nonSmaCountryId, mentorStatusId, sponsorStatusId, yearJoinedJa, bestWayToContactId, countryOfResidenceID, spanishSkillLevelId, englishSkillLevelId, studentPreferenceId, LastLoginDateTime, NumberOfLogins, preferredLanguageId) {
        this.memberId = memberId;
        this.lastNames = lastNames;
        this.firstNames = firstNames;
        this.smaPhone = smaPhone;
        this.NonSmaPhone = NonSmaPhone;
        this.email = email;
        this.monthsinSma = monthsinSma;
        this.technology = technology;
        this.nonSmaCountryId = nonSmaCountryId;
        this.mentorStatusId = mentorStatusId;
        this.sponsorStatusId = sponsorStatusId;
        this.yearJoinedJa = yearJoinedJa;
        this.bestWayToContactId = bestWayToContactId;
        this.countryOfResidenceID = countryOfResidenceID;
        this.spanishSkillLevelId = spanishSkillLevelId;
        this.englishSkillLevelId = englishSkillLevelId;
        this.studentPreferenceId = studentPreferenceId;
        this.LastLoginDateTime = LastLoginDateTime;
        this.NumberOfLogins = NumberOfLogins;
        this.preferredLanguageId = preferredLanguageId;
    }
    return Member;
}());
export { Member };
//# sourceMappingURL=member.js.map