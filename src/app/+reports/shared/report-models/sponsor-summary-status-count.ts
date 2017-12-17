export class SponsorSummaryStatusCount {

          constructor(
            public rowName: string,
            public NEEDS_SETUP: number,
            public NEEDS_REVIEW: number,
            public READY_TO_SEND: number,
            public SENT: number,
            public SKIPPED: number,
          ) {}
    }
