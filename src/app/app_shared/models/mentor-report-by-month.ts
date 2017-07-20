export class MentorReportByMonth {

      constructor(
        public mentorReportId: number,
        public mentorId: number,
        public studentId: number,
        public reportDate: string,
        public reportYear: number,
        public reportMonth: number,
        public sponsorSummaryStatusId: number,
        public sponsorSummaryStatus: string,
        public mentorName: string,
        public studentName: string,
        public mentorReportSnapshot?: string,
        public latestMonth?: string,
        public reportDateTime?: Date,

        public followUpNeeded?: string,
        public recentSuccess?: string,
        public recentSetback?: string,
        public sponsorSummary?: string,

        public sponsorSummarySentDateTime?: Date,
        public sponsorFirstName?: string,
        public sponsorLastName?: string,
        public sponsorPreferredLanguageId?: number,
        public followUpStatusId?: number,
        public highlightStatusId?: number,
        public highlightStatus?: string,
      ) {}
}
