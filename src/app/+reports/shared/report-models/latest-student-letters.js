var LatestStudentLetters = (function () {
    function LatestStudentLetters(studentId, sponsorGroupId, primarySponsorId, studentName, SponsorGroupName, PrimarySponsorName, sponsorEmail, sponsorPhone, latestMonth, letterDateTime) {
        this.studentId = studentId;
        this.sponsorGroupId = sponsorGroupId;
        this.primarySponsorId = primarySponsorId;
        this.studentName = studentName;
        this.SponsorGroupName = SponsorGroupName;
        this.PrimarySponsorName = PrimarySponsorName;
        this.sponsorEmail = sponsorEmail;
        this.sponsorPhone = sponsorPhone;
        this.latestMonth = latestMonth;
        this.letterDateTime = letterDateTime;
    }
    return LatestStudentLetters;
}());
export { LatestStudentLetters };
//# sourceMappingURL=latest-student-letters.js.map