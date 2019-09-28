export class SponsorSummarySentCount {

      constructor(
        public sponsorGroupName: string,
        public studentId: number,
        public studentName: string,
        public mentorName: string,
        public sentCount: number,
        public latestDate: Date
      ) {}
}
