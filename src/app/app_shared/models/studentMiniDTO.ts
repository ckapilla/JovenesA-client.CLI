 export class StudentMiniDTO {

      constructor(
        public studentId: number, // StudentID (Primary key)
        public studentName: string, // StudentName
        public gender: string, // Gender
        public status: string, // Status
        public statusID?: number, // StatusID
      ) {}
}
