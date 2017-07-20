export class LatestStudentLetters {

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
        public letterDateTime?: Date

      ) {}
}
