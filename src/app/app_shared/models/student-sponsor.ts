 export class RptStudentSponsor {

      constructor(
        public studentId: string,
        public studentFirstNames: string,
        public studentLastNames: string,
        public yearJoinedJA: number,
        public gradYear: number,
        public sponsorGroupId: number,
        public sponsorGroupName: string,
        public primarySponsorId: number,
        public primarySponsorFirstNames: string,
        public primarySponsorLastNames: string,
        public primarySponsorEmail: string
      ) {}
 }
