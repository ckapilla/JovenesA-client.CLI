export class StudentDTO {

  constructor(
    public studentId: number, // StudentID (Primary key)
    public studentName: string, // StudentName
    public email: string, // Email
    public studentAsMemberGUId: string,
    public gender: string, // Gender
    public status: string, // Status
    public esStatus: string, // Status
    public yearJoinedJa?: number, // YearJoinedJA
    public statusId?: number, // StatusID
    public gradYear?: number, // GradYear
    public gradMonth?: string, // GradMonth
    public gradeRptStatus?: string, // GradeRptStatus
    public gpaStatus?: string, // GPAStatus

    public numericGradeRptStatus?: number,
    public numericGPAStatus?: number,

    public timelyMentorMeetingStatus?: string,
    public timelyMentorReportStatus?: string,

    public numericTimelyMentorMeetingStatus?: number,
    public numericTimelyMentorReportStatus?: number,

    public studentAssessmentStatus?: number,
    public studentSnapshotStatus?: number,
    public mentorId?: number,  // MentorID
    public mentorName?: number, // MentorName
    public sponsorGroupName?: string, // MentorName
    public sponsorId?: number,
    public timelyStudentLetterStatus?: string,
    public ssrReportDateString?: string,
    public universityAbbrev?: string,
    public major?: string,
    public joinedFromId?: number,
    public joinedFrom?: string,
    public photoUrl?: string,
    public studentGUId?: string

  ) { }
}
