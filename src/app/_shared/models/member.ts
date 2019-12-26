export class Member {

  constructor(
    public memberId?: number,
    public lastNames?: string,
    public firstNames?: string,
    public email?: string,
    public smA_Phone?: string,
    public nonSMA_Phone?: string,

    // public SmaAddress: string,

    // public NonSmaAddress: string,
    // public NonSmaCity: string,
    // public NonSmaStateProvince: string,
    // public NonSmaPostalCode: string,

    public mentorStatusId?: number,
    public sponsorStatusId?: number,
    public adminStatusId?: number,
    public employeeStatusId?: number,
    public donorStatusId?: number,
    public volunteerStatusId?: number,
    public presidentStatusId?: number,
    public boardMemberStatusId?: number,

    public yearJoinedJa?: number,
    public monthsinSma?: string,
    public nonSma_CountryId?: number,
    public bestWayToContactId?: number,
    public countryOfResidenceId?: number,

    public spanishSkillLevelId?: number,
    public englishSkillLevelId?: number,
    public preferredLanguageId?: number,
    // public studentPreferenceId?: number,

    public lastLoginDateTime?: Date,
    public numberOfLogins?: number,

    public careerBackground?: string,
    public otherRelevantExperience?: string,
    public comments?: string,
    public photoUrl?: string,

    public studentRecordGUId?: string,
    public memberGUId?: string,
    public lastMentorMeeting?: Date

  ) { }
}