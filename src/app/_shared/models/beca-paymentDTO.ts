export class BecaPaymentDTO {
  becaPaymentId?: number;
  pcsCode?: number;
  pcsYear?: number;
  pcsMonthNum?: number;
  studentId?: number;
  studentGUId?: string;
  studentName?: string;
  fullName?: string;
  mentorReportStatus?: string;
  studentReportStatus?: string;
  inscriptionReportStatus?: string;
  gradeReportStatus?: string;
  paymentStatusId?: number;
  paymentStatus?: string;
  defaultBeca?: number;
  requestedBeca?: number;
  approvedById?: number;
  approvedBy?: string;
  // approvedByDateTime?: Date;
  comment?: string;
}