var StudentDTO = (function () {
    function StudentDTO(studentDTOId, // StudentDTOID (Primary key)
        studentName, // StudentName
        email, // Email
        gender, // Gender
        status, // Status
        esStatus, // Status
        yearJoinedJa, // YearJoinedJA
        statusID, // StatusID
        gradYear, // GradYear
        gradeRptStatus, // GradeRptStatus
        gPAStatus, // GPAStatus
        timelyMentorMeetingStatus, timelyMentorReportStatus, studentAssessmentStatus, studentSnapshotStatus, mentorId, // MentorID
        mentorName, // MentorName
        sponsorName, // MentorName
        sponsorId, timelyStudentLetterStatus) {
        this.studentDTOId = studentDTOId;
        this.studentName = studentName;
        this.email = email;
        this.gender = gender;
        this.status = status;
        this.esStatus = esStatus;
        this.yearJoinedJa = yearJoinedJa;
        this.statusID = statusID;
        this.gradYear = gradYear;
        this.gradeRptStatus = gradeRptStatus;
        this.gPAStatus = gPAStatus;
        this.timelyMentorMeetingStatus = timelyMentorMeetingStatus;
        this.timelyMentorReportStatus = timelyMentorReportStatus;
        this.studentAssessmentStatus = studentAssessmentStatus;
        this.studentSnapshotStatus = studentSnapshotStatus;
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.sponsorName = sponsorName;
        this.sponsorId = sponsorId;
        this.timelyStudentLetterStatus = timelyStudentLetterStatus;
    }
    return StudentDTO;
}());
export { StudentDTO };
//# sourceMappingURL=studentDTO.js.map