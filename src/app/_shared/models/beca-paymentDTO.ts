export class BecaPaymentDTO {
  becaPaymentId?: number;
  pcsYear?: number;
  pcsid?: number;
  studentId?: number;
  studentName?: string;
  fullName?: string;
  mentorReportStatus?: string;
  studentReportStatus?: string;
  gradeReportStatus?: string;
  inscriptionReportStatus?: string;
  overrideApprovedById?: number;
  overrideApprovedBy?: string;
  overrideComment?: string;
  reviewedStatusId?: number;
  monthlyBeca?: number;
  paymentAmount?: number;
}