export class MentorReportSubmittedCount {
	constructor(
		public mentorName: string,
		public mentorGUId: string,
		public studentName: string,
		public mentorAssignedDate: Date,
		public submittedCount: number,
		public latestDate: Date
	) {}
}
