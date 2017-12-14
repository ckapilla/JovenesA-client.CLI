export class MentorReportsStatusCount {

        constructor(
          public reportYear: number,
          public reportMonth: number,
          public sponsorSummaryStatusId: number,
          public sponsorSummaryStatus: string,
          public statusCount: string
        ) {}
  }
