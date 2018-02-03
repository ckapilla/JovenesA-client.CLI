 export class StudentDTO {

      constructor(

        public studentId: number, // StudentID (Primary key)
        public studentName: string, // StudentName
        public email: string, // Email
        public gender: string, // Gender
        public status: string, // Status
        public esStatus: string, // Status
        public yearJoinedJa?: number, // YearJoinedJA
        public statusID?: number, // StatusID
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
        public sponsorName?: string, // MentorName
        public sponsorId?: number,
        public timelyStudentLetterStatus?: string,
        public universityAbbrev?: string

      ) {}
}
