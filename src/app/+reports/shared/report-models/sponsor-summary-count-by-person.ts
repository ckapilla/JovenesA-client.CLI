export class SponsorSummaryCountByPerson {

          constructor(
            public pledgeGroupName: string,
            public studentName: string,
            public mentorName: string,
            public SENT: number,
            public SKIPPED: number
          ) {}
    }
