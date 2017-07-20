 export class Student {

      constructor(
        public studentId?: number,
        public JaId?: string, // JA_ID
        public lastNames?: string,
        public firstNames?: string,

        public NickName?: string, // NickName
        //[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        //public FullName // FullName
        public Curp?: string, // CURP
        public Rfc?: string, // RFC
        public BankAccount?: string, // BankAccount
        public Gender?: string, // Gender
        public CellPhone?: string, // CellPhone
        public HomePhone?: string, // HomePhone
        public OtherPhone?: string, // OtherPhone
        public Email?: string, // Email
        public EnglishLevel?: string, // EnglishLevel
        public Sponsor?: string, // Sponsor
        public PrepaId?: number, // PrepaID
        public Major?: string, // Major
        public MentorId?: string, // MentorID
        public AgeWhenJoined?: string, // AgeWhenJoined
        public YearJoinedJa?: string, // YearJoinedJA
        public UniversityId?: string, // UniversityID
        public GradMonth?: string, // GradMonth
        public GradYear?: string, // GradYear
        public Dob?: Date, // DOB
        public Addresss?: string, // Addresss
        public Colonia?: string, // Colonia
        public InitialInterview?: string, // InitialInterview
        public SponsorId?: number, // SponsorID
        public StatusId?: number, // StatusID
        public EnglishSkillLevelId?: number, // EnglishSkillLevelID
        public PhotoUrl?: string, // PhotoURL
        public UpdateDtTm?: Date, // UpdateDtTm
        //public byte[] Timestamp?: string, // Timestamp
        public EmergencyContactName?: string, // EmergencyContactName
        public EmergencyContactPhone?: string, // EmergencyContactPhone
        public PostalCode?: string, // PostalCode
        public AcademicYearTypeId?: number, // AcademicYearTypeID
        public GradeMonthsId?: number, // GradeMonthsID
        public JoinedFromId?: number, // JoinedFromID
        public StudentStory?: string // StudentStory


      ) {}
}
