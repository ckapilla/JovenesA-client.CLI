import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/app_shared/services/session.service';

@Component({
  selector: 'app-mr-consolidated',
  templateUrl: './mr-consolidated.component.html',
  styleUrls: ['./mr-consolidated.component.css']
})
export class MrConsolidatedComponent implements OnInit {
  isLoading: boolean;
  studentName: string;
  studentId: number;
  studentGUId: string;


  constructor(private session: SessionService) {

  }

  ngOnInit() {
  }

  onSelectedStudentName(studentName: string) {
    console.log('$$$$$$$ got selected NAME event');
    this.studentName = '' + studentName;
    // this.session.setStudentInContextName(studentName);
  }

  // onSelectedStudentId(studentId: number) {
  //   console.log('$$$$$$$ got selectedId event');
  //   this.isLoading = true;
  //   // this.haveCurrentReport = false;
  //   // this.studentId = studentId;
  //   // this.sqlResource.getMentorReport2RPTs(this.mentorId, studentId)
  //   //   .subscribe(
  //   //     data => { this.mentorReports2 = data; },
  //   //     err => console.error('Subscribe error: ' + err),
  //   //     () => {
  //   //       console.log('done: ');
  //   //       this.isLoading = false;
  //   //       for (const x of this.mentorReports2) {
  //   //         if (x.reviewedStatusId === 2086) {
  //   //           // console.log('current report found; disable add function');
  //   //           this.haveCurrentReport = true;
  //   //         }
  //   //       }

  //   //     }
  //   //   );
  // }

  onSelectedStudentGUId(studentGUId: string) {
    console.log('$$$$$$$ got selectedGUId event');
    this.isLoading = true;
    // this.haveCurrentReport = false;
    // this.studenGUId = studentGUId;
    // this.sqlResource.getMentorReport2RPTs(this.mentorId, studentId)
    //   .subscribe(
    //     data => { this.mentorReports2 = data; },
    //     err => console.error('Subscribe error: ' + err),
    //     () => {
    //       console.log('done: ');
    //       this.isLoading = false;
    //       for (const x of this.mentorReports2) {
    //         if (x.reviewedStatusId === 2086) {
    //           // console.log('current report found; disable add function');
    //           this.haveCurrentReport = true;
    //         }
    //       }

    //     }
    //   );
  }
}
