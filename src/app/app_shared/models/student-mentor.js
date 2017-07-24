var RptStudentMentor = (function () {
    function RptStudentMentor(studentId, // StudentID (Primary key)
        mentorId, // MentorID (Primary key)
        studentLastNames, // LastNames
        studentFirstNames, // FirstNames
        mentorLastNames, // LastNames
        mentorFirstNames, // FirstNames
        gradYear, // GradYear
        gradeRptStatus, // GradeRptStatus
        gPAStatus, // GPAStatus
        timelyMentorMeetingStatus, timelyMentorReportStatus, studentSnapshotStatus, universityName, // UniversityName
        studentEmail, studentPhone, mentorEmail) {
        this.studentId = studentId;
        this.mentorId = mentorId;
        this.studentLastNames = studentLastNames;
        this.studentFirstNames = studentFirstNames;
        this.mentorLastNames = mentorLastNames;
        this.mentorFirstNames = mentorFirstNames;
        this.gradYear = gradYear;
        this.gradeRptStatus = gradeRptStatus;
        this.gPAStatus = gPAStatus;
        this.timelyMentorMeetingStatus = timelyMentorMeetingStatus;
        this.timelyMentorReportStatus = timelyMentorReportStatus;
        this.studentSnapshotStatus = studentSnapshotStatus;
        this.universityName = universityName;
        this.studentEmail = studentEmail;
        this.studentPhone = studentPhone;
        this.mentorEmail = mentorEmail;
    }
    return RptStudentMentor;
}());
export { RptStudentMentor };
//# sourceMappingURL=student-mentor.js.map