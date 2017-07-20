export class LatestStudentLetters2 {

      constructor(

        public studentId: number,
        public sponsorGroupId: number,
        public primarySponsorId: number,
        public studentName: string,
        public SponsorGroupName: string,
        public PrimarySponsorName: string,
        public sponsorEmail: string,
        public sponsorPhone: string,
        public latestMonth: string,
        public letterText: string,
        public letterTextEnglish: string,
        public letterDateTime?: Date

      ) {}
}
