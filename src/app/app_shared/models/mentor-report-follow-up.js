var MentorReportFollowUp = (function () {
    function MentorReportFollowUp(mentorReportId, mentorId, studentId, mentorName, studentName, mentorReportSnapshot, lastContactYear, lastContactMonth, ReportDate, followUpNeeded, followUpStatusId, followUpHistory, followUpStatus) {
        this.mentorReportId = mentorReportId;
        this.mentorId = mentorId;
        this.studentId = studentId;
        this.mentorName = mentorName;
        this.studentName = studentName;
        this.mentorReportSnapshot = mentorReportSnapshot;
        this.lastContactYear = lastContactYear;
        this.lastContactMonth = lastContactMonth;
        this.ReportDate = ReportDate;
        this.followUpNeeded = followUpNeeded;
        this.followUpStatusId = followUpStatusId;
        this.followUpHistory = followUpHistory;
        this.followUpStatus = followUpStatus;
    }
    return MentorReportFollowUp;
}());
export { MentorReportFollowUp };
//# sourceMappingURL=mentor-report-follow-up.js.map