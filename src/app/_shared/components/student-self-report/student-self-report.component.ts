import { Component, OnInit } from '@angular/core';
import { StudentSelfReport } from '../../models/student-self-report';

@Component({
  selector: 'app-student-self-report',
  templateUrl: './student-self-report.component.html',
  styleUrls: ['./student-self-report.component.css']
})
export class StudentSelfReportComponent implements OnInit {
  selfReport: StudentSelfReport;
  showText: true;


  constructor() { }

  ngOnInit() {
    this.selfReport = new StudentSelfReport();
  }

}
