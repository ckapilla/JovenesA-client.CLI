 export class StudentMentorDTOXX {

      constructor(
        public studentId: string, // StudentID (Primary key)
        public mentorId: Number, // MentorID (Primary key)
        public studentLastNames: string, // LastNames
        public studentFirstNames: string, // FirstNames
        public studentEmail: string,
        public studentPhone: string,
        public studentStatusId: number,
        public studentStatus: string,
        public studentYearJoined: number,
        public gradYear: Number, // GradYear
        public universityName: string, // UniversityName

        public mentorLastNames: string, // LastNames
        public mentorFirstNames: string, // FirstNames
        public mentorEmail: string,
        public mentorPhone: string,
        public mentorStatusId: number,
        public mentorStatus: string,
        public mentorPreferredLanguage: string
      ) {}
 }
