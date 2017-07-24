var RptStudentSponsor = (function () {
    function RptStudentSponsor(studentId, studentFirstNames, studentLastNames, yearJoinedJA, gradYear, sponsorGroupId, sponsorGroupName, primarySponsorId, primarySponsorFirstNames, primarySponsorLastNames, primarySponsorEmail) {
        this.studentId = studentId;
        this.studentFirstNames = studentFirstNames;
        this.studentLastNames = studentLastNames;
        this.yearJoinedJA = yearJoinedJA;
        this.gradYear = gradYear;
        this.sponsorGroupId = sponsorGroupId;
        this.sponsorGroupName = sponsorGroupName;
        this.primarySponsorId = primarySponsorId;
        this.primarySponsorFirstNames = primarySponsorFirstNames;
        this.primarySponsorLastNames = primarySponsorLastNames;
        this.primarySponsorEmail = primarySponsorEmail;
    }
    return RptStudentSponsor;
}());
export { RptStudentSponsor };
//# sourceMappingURL=student-sponsor.js.map