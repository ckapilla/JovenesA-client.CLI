export class MentorReportFollowUp {

      constructor(
        public mentorReportId: number,
        public mentorId: number,
        public studentId: number,

        public mentorName: string,
        public studentName: string,
        public mentorReportSnapshot: string,
        public lastContactYear: number,
        public lastContactMonth: number,
        public ReportDate: string,

        public followUpNeeded?: string,
        public followUpStatusId?: number,
        public followUpHistory?: string,
        public followUpStatus?: string
      ) {}
}
