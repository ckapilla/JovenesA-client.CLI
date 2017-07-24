var Student = (function () {
    function Student(studentId, JaId, // JA_ID
        lastNames, firstNames, NickName, // NickName
        //[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        //public FullName // FullName
        Curp, // CURP
        Rfc, // RFC
        BankAccount, // BankAccount
        Gender, // Gender
        CellPhone, // CellPhone
        HomePhone, // HomePhone
        OtherPhone, // OtherPhone
        Email, // Email
        EnglishLevel, // EnglishLevel
        Sponsor, // Sponsor
        PrepaId, // PrepaID
        Major, // Major
        MentorId, // MentorID
        AgeWhenJoined, // AgeWhenJoined
        YearJoinedJa, // YearJoinedJA
        UniversityId, // UniversityID
        GradMonth, // GradMonth
        GradYear, // GradYear
        Dob, // DOB
        Addresss, // Addresss
        Colonia, // Colonia
        InitialInterview, // InitialInterview
        SponsorId, // SponsorID
        StatusId, // StatusID
        EnglishSkillLevelId, // EnglishSkillLevelID
        PhotoUrl, // PhotoURL
        UpdateDtTm, // UpdateDtTm
        //public byte[] Timestamp?: string, // Timestamp
        EmergencyContactName, // EmergencyContactName
        EmergencyContactPhone, // EmergencyContactPhone
        PostalCode, // PostalCode
        AcademicYearTypeId, // AcademicYearTypeID
        GradeMonthsId, // GradeMonthsID
        JoinedFromId, // JoinedFromID
        StudentStory // StudentStory
    ) {
        this.studentId = studentId;
        this.JaId = JaId;
        this.lastNames = lastNames;
        this.firstNames = firstNames;
        this.NickName = NickName;
        this.Curp = Curp;
        this.Rfc = Rfc;
        this.BankAccount = BankAccount;
        this.Gender = Gender;
        this.CellPhone = CellPhone;
        this.HomePhone = HomePhone;
        this.OtherPhone = OtherPhone;
        this.Email = Email;
        this.EnglishLevel = EnglishLevel;
        this.Sponsor = Sponsor;
        this.PrepaId = PrepaId;
        this.Major = Major;
        this.MentorId = MentorId;
        this.AgeWhenJoined = AgeWhenJoined;
        this.YearJoinedJa = YearJoinedJa;
        this.UniversityId = UniversityId;
        this.GradMonth = GradMonth;
        this.GradYear = GradYear;
        this.Dob = Dob;
        this.Addresss = Addresss;
        this.Colonia = Colonia;
        this.InitialInterview = InitialInterview;
        this.SponsorId = SponsorId;
        this.StatusId = StatusId;
        this.EnglishSkillLevelId = EnglishSkillLevelId;
        this.PhotoUrl = PhotoUrl;
        this.UpdateDtTm = UpdateDtTm;
        this.EmergencyContactName = EmergencyContactName;
        this.EmergencyContactPhone = EmergencyContactPhone;
        this.PostalCode = PostalCode;
        this.AcademicYearTypeId = AcademicYearTypeId;
        this.GradeMonthsId = GradeMonthsId;
        this.JoinedFromId = JoinedFromId;
        this.StudentStory = StudentStory; // StudentStory
    }
    return Student;
}());
export { Student };
//# sourceMappingURL=student.js.map