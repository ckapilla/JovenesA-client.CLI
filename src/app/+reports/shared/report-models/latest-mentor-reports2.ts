export class LatestMentorReports2 {

      constructor(
        public mentorReportId?: number,
        public mentorId?: number,
        public studentId?: number,
        public mentorName?: string,
        public mentorPreferredLanguageId?: number,
        public studentName?: string,
        public studentEmail?: string,
        public studentPhone?: string,
        public mentorReportSnapshot?: string,
        public latestMonth?: string,
        public reportDate?: string,
        public followUpNeeded?: string,
        public recentSuccess?: string,
        public recentSetback?: string,
        public sponsorSummary?: string,
        public sponsorSummaryStatus?: string,
        public sponsorSummarySentDateTime?: Date,
        public reportDateTime?: Date,
        public sponsorFirstName?: string,
        public sponsorLastName?: string,
        public sponsorPreferredLanguageId?: number,
        public originalLanguageId?: number
      ) {}
}
