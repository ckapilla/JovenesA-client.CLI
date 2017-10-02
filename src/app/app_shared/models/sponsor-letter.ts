  export class SponsorLetter {
      constructor(
        public sponsorLetterId?: number,
        public studentId?: number,
        public sponsorGroupId?: number,
        public sponsorName?: string,
        public studentName?: string,
        public letterDateTime?: Date,
        public letterText?: string,
        public letterYear?: number,
        public letterMonth?: number
      ) {

      }
    }
