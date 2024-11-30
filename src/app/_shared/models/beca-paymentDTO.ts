export class BecaPaymentDTO {
  becaPaymentId?: number;
  pcsYear?: number;
  pcsMonthNum?: number;
  pcsid?: number;
  studentId?: number;
  studentGUId?: string;
  studentName?: string;
  fullName?: string;
  mentorReportStatus?: string;
  studentReportStatus?: string;
  inscriptionReportStatus?: string;
  gradeReportStatus?: string;
  approvedBy?: string;
  comment?: string;
  reviewedStatus?: string;
  defaultBeca?: number;
  requestedBeca?: number;
}