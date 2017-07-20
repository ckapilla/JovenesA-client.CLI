export class Admin {

      constructor(
        public adminId?: number,
        public lastNames?: string,
        public firstNames?: string,
        // public FullName: string,

        // public SmaAddress: string,
         public smaPhone?: string,
        // public NonSmaAddress: string,
        // public NonSmaCity: string,
        // public NonSmaStateProvince: string,
        // public NonSmaPostalCode: string,

        // public NonSmaPhone: string,
        // public Email: string,
        public monthsinSma?: string,
        // public CareerExperience: string,
        // public MentoringExperience: string,
        // public OtherRelevantLifeExperience: string,
        // public UpdateDtTm: Date,

        public technology?: string,

        public nonSmaCountryId?: number,
        public mentorStatusId?: number,
        public yearJoinedJa?: number,
        public bestWayToContactId?: number,
        public countryOfResidenceID?: number,
        public spanishSkillLevelId?: number,
        public englishSkillLevelId?: number,
        public studentPreferenceId?: number

      ) {}
}
