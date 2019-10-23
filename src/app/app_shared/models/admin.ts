export class Admin {

  constructor(
    public adminId?: number,
    public lastNames?: string,
    public firstNames?: string,
    // public FullName: string,

    // public SmaAddress: string,
    public sma_Phone?: string,
    // public NonSmaAddress: string,
    // public NonSmaCity: string,
    // public NonSmaStateProvince: string,
    // public NonSmaPostalCode: string,

    public nonSma_Phone?: string,
    // public Email: string,
    public monthsinSma?: string,
    // public CareerExperience: string,
    // public MentoringExperience: string,
    // public OtherRelevantLifeExperience: string,
    // public UpdateDtTm: Date,

    public technology?: string,

    public nonSma_CountryId?: number,
    public mentorStatusId?: number,
    public yearJoinedJa?: number,
    public bestWayToContactId?: number,
    public countryOfResidenceId?: number,
    public spanishSkillLevelId?: number,
    public englishSkillLevelId?: number,
    public studentPreferenceId?: number

  ) { }
}
