var Mentor = (function () {
    function Mentor(mentorId, lastNames, firstNames, 
        // public FullName: string,
        // public SmaAddress: string,
        smaPhone, 
        // public NonSmaAddress: string,
        // public NonSmaCity: string,
        // public NonSmaStateProvince: string,
        // public NonSmaPostalCode: string,
        // public NonSmaPhone: string,
        // public Email: string,
        monthsinSma, 
        // public CareerExperience: string,
        // public MentoringExperience: string,
        // public OtherRelevantLifeExperience: string,
        // public UpdateDtTm: Date,
        technology, nonSmaCountryId, mentorStatusId, yearJoinedJa, bestWayToContactId, countryOfResidenceID, spanishSkillLevelId, englishSkillLevelId, studentPreferenceId, preferredLanguageId) {
        this.mentorId = mentorId;
        this.lastNames = lastNames;
        this.firstNames = firstNames;
        this.smaPhone = smaPhone;
        this.monthsinSma = monthsinSma;
        this.technology = technology;
        this.nonSmaCountryId = nonSmaCountryId;
        this.mentorStatusId = mentorStatusId;
        this.yearJoinedJa = yearJoinedJa;
        this.bestWayToContactId = bestWayToContactId;
        this.countryOfResidenceID = countryOfResidenceID;
        this.spanishSkillLevelId = spanishSkillLevelId;
        this.englishSkillLevelId = englishSkillLevelId;
        this.studentPreferenceId = studentPreferenceId;
        this.preferredLanguageId = preferredLanguageId;
    }
    return Mentor;
}());
export { Mentor };
//# sourceMappingURL=mentor.js.map