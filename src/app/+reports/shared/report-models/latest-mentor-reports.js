var LatestMentorReports = (function () {
    function LatestMentorReports(mentorId, studentId, mentorName, mentorEmail, mentorPhone, studentName, studentEmail, studentPhone, mentorReportSnapshot, latestMonth, reportDate, reportDateTime) {
        this.mentorId = mentorId;
        this.studentId = studentId;
        this.mentorName = mentorName;
        this.mentorEmail = mentorEmail;
        this.mentorPhone = mentorPhone;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.studentPhone = studentPhone;
        this.mentorReportSnapshot = mentorReportSnapshot;
        this.latestMonth = latestMonth;
        this.reportDate = reportDate;
        this.reportDateTime = reportDateTime;
    }
    return LatestMentorReports;
}());
export { LatestMentorReports };
//# sourceMappingURL=latest-mentor-reports.js.map