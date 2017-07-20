 export class RptStudentMentor {

      constructor(
        public studentId: string, // StudentID (Primary key)
        public mentorId: Number, // MentorID (Primary key)
        public studentLastNames: string, // LastNames
        public studentFirstNames: string, // FirstNames
        public mentorLastNames: string, // LastNames
        public mentorFirstNames: string, // FirstNames
        public gradYear: Number, // GradYear
        public gradeRptStatus: string, // GradeRptStatus
        public gPAStatus: string, // GPAStatus
        public timelyMentorMeetingStatus: string,
        public timelyMentorReportStatus: string,
        public studentSnapshotStatus:  Number,
        public universityName: string, // UniversityName
        public studentEmail: string,
        public studentPhone: string,
        public mentorEmail: string
      ) {}
 }
