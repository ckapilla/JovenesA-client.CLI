  export class RptSponsorLetter {
      constructor(
        public sponsorLetterId?: number,
        public studentId?: number,
        public sponsorId?: number,
        public sponsorName?: string,
        public studentName?: string,
        public letterDateTime?: Date,
        public letterText?: string,
        public letterYear?: number,
        public letterMonth?: number
      ) {

      }
    }
