export class SponsorDTO {
    constructor(
      public sponsorId: number | null,
      public sponsorName: string,
      public sponsorStatusId: number,
      public sponsorStatus: string,
      public sponsorRequiredLanguage: string,
      public sponsorPreferredLanguage: string
    ) {}
  }
