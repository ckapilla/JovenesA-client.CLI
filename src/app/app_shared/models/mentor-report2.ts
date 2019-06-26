  export class MentorReport2RPT {

      constructor(
        public mentorReportId?: number,
        public mentorId?: number,
        public studentId?: number,
        public mentorName?: string,
        public studentName?: string,
        public reportDateTime?: Date,
        public lastContactYear?: number,
        public lastContactMonth?: number,
        public emoji?: number,
        public narrative_English?: string,
        public narrative_Spanish?: string,
        public originalLanguageId?: number,
        public reviewedStatusId?: number
      ) {

      }
    }
