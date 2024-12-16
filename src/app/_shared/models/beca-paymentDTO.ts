export class BecaPaymentDTO {
  becaPaymentId?: number;
  pcsYear?: number;
  pcsMonthNum?: number;
  pcsId?: number;
  studentId?: number;
  studentGUId?: string;
  studentName?: string;
  fullName?: string;
  mentorReportStatus?: string;
  studentReportStatus?: string;
  inscriptionReportStatus?: string;
  gradeReportStatus?: string;
  approvedBy?: string;

  paymentStatus?: string;
  defaultBeca?: number;
  requestedBeca?: number;
  approvedById?: number;
  approvedByDateTime?: Date;
  comment?: string;
}