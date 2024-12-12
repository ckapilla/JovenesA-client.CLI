export class BecaPayment {
  becaPaymentId?: number;
  pcsid?: number;
  pcsYear?: number;
  pcsMonthNum?: number;
  studentId?: number;
  studentGUId?: string;
  mentorReportStatusId?: number;
  studentReportStatusId?: number;
  inscriptionReportStatusId?: number;
  gradeReportStatusId?: number;
  paymentStatusId?: number;
  defaultBeca?: number;
  requestedBeca?: number;
  approvedBy?: string;
  approvedById?: number;
  approvedByDateTime?: Date;
  comment?: string;
}