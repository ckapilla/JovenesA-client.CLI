export class LatestStudentLetters {

      constructor(

        public studentId: number,
        public sponsorGroupId: number,
        public primarySponsorId: number,
        public studentName: string,
        public sponsorGroupName: string,
        public primarySponsorName: string,
        public sponsorEmail: string,
        public sponsorPhone: string,
        public latestMonth: string,
        public letterDateTime?: Date

      ) {}
}
