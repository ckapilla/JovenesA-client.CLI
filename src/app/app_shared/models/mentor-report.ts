  export class RptMentorReport {

      constructor(
        public mentorReportId?: number,
        public mentorId?: number,
        public studentId?: number,
        public mentorName?: string,
        public studentName?: string,
        public reportDateTime?: Date,
        public lastContactDate?: Date,
        public mentorReportSnapshot?: number,
        public reasonForDelay?: string,
        public followUpNeeded?: string,
        public recentSuccess?: string,
        public recentSetback?: string,
        public lastContactYear?: number,
        public lastContactMonth?: number,
        public sponsorSummary?: string,
        public sponsorSummaryStatusId?: number,
        public sponsorSummarySentDateTime?: Date,
        public originalLanguageId?: number,
        public followUpStatusId?: number,
        public highlightStatusId?: number,
        public followUpHistory?: string
      ) {

      }
    }
