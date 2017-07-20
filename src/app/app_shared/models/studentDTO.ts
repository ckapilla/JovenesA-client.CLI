 export class StudentDTO {

      constructor(

        public studentDTOId: number, // StudentDTOID (Primary key)
        public studentName: string,// StudentName
        public email: string,// Email
        public gender: string, // Gender
        public status: string, // Status
        public esStatus: string, // Status
        public yearJoinedJa?: number, // YearJoinedJA
        public statusID?: number, // StatusID
        public gradYear?: number, // GradYear
        public gradeRptStatus?: number, // GradeRptStatus
        public gPAStatus?: number, // GPAStatus
        public timelyMentorMeetingStatus?: number,
        public timelyMentorReportStatus?: number,
        public studentAssessmentStatus?: number,
        public studentSnapshotStatus?: number,
        public mentorId?: number,  // MentorID
        public mentorName?: string, // MentorName
        public sponsorName?: string, // MentorName
        public sponsorId?: number,
        public timelyStudentLetterStatus?: string

      ) {}
}
