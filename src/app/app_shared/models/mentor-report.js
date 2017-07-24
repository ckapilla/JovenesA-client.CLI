var RptMentorReport = (function () {
    function RptMentorReport(mentorReportId, mentorId, studentId, mentorName, studentName, reportDateTime, lastContactDate, mentorReportSnapshot, reasonForDelay, followUpNeeded, recentSuccess, recentSetback, lastContactYear, lastContactMonth, sponsorSummary, sponsorSummaryStatusId, sponsorSummarySentDateTime, originalLanguageId, followUpStatusId, highlightStatusId, followUpHistory) {
        this.mentorReportId = mentorReportId;
        this.mentorId = mentorId;
        this.studentId = studentId;
        this.mentorName = mentorName;
        this.studentName = studentName;
        this.reportDateTime = reportDateTime;
        this.lastContactDate = lastContactDate;
        this.mentorReportSnapshot = mentorReportSnapshot;
        this.reasonForDelay = reasonForDelay;
        this.followUpNeeded = followUpNeeded;
        this.recentSuccess = recentSuccess;
        this.recentSetback = recentSetback;
        this.lastContactYear = lastContactYear;
        this.lastContactMonth = lastContactMonth;
        this.sponsorSummary = sponsorSummary;
        this.sponsorSummaryStatusId = sponsorSummaryStatusId;
        this.sponsorSummarySentDateTime = sponsorSummarySentDateTime;
        this.originalLanguageId = originalLanguageId;
        this.followUpStatusId = followUpStatusId;
        this.highlightStatusId = highlightStatusId;
        this.followUpHistory = followUpHistory;
    }
    return RptMentorReport;
}());
export { RptMentorReport };
//# sourceMappingURL=mentor-report.js.map