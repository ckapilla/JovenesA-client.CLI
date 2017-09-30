 export class Member {

      constructor(
        public memberId?: number,
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
        public email?: string,
        public monthsinSma?: string,
        // public CareerExperience: string,
        // public MentoringExperience: string,
        // public OtherRelevantLifeExperience: string,
        // public UpdateDtTm: Date,

        public technology?: string,

        public nonSma_CountryId?: number,
        public mentorStatusId?: number,
        public sponsorStatusId?: number,
        public yearJoinedJa?: number,
        public bestWayToContactId?: number,
        public countryOfResidenceID?: number,
        public spanishSkillLevelId?: number,
        public englishSkillLevelId?: number,
        public studentPreferenceId?: number,

        public LastLoginDateTime?: Date,
        public NumberOfLogins?: number,
        public preferredLanguageId?: number
      ) {}
}
