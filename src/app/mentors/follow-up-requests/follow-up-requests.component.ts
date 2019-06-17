import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { FollowUpRequestRPT } from '../../app_shared/models/follow-up-requestRPT';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  selector: 'app-follow-up-requests',
  templateUrl: 'follow-up-requests.component.html'
})
export class FollowUpRequestsComponent implements OnInit {
  followUpRequests: FollowUpRequestRPT[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  studentId: number;
  studentName: string;
  displayCompleteHistory: true;


  constructor(public sqlResource: SqlResource,
    public router: Router,
    public session: SessionService
  ) {

    this.followUpStatuses = [
      { value: '0', label: '[All]' },
      { value: '2091', label: 'Requested' },
      { value: '2092', label: 'Assigned' },
      { value: '2104', label: 'Closed' }
    ];
  }

  ngOnInit() {

  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for mentor  FollowUpRequests with studentId' + this.studentId);
    this.sqlResource.getFollowUpRequests(this.studentId)
      .subscribe(
        data => { this.followUpRequests = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done >>'); console.log(this.followUpRequests[0]); console.log('<<');
          this.isLoading = false;
        }
      );
  }


  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const target = '/mentors/follow-up-requests-add';
    this.router.navigateByUrl(target);
  }
  onSelectedStudentName(studentName: string) {
    console.log('$$$$$$$ got selected NAME event');
    this.studentName = '' + studentName;
    this.session.setStudentInContextName(studentName);
  }

  onSelectedStudentId(studentId: number) {
    console.log('$$$$$$$ got selectedId event');
    this.studentId = studentId;
    this.fetchData();
  }
}





// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MentorReportRPT } from '../../app_shared/models/mentor-report';
// import { SessionService } from '../../app_shared/services/session.service';
// import { SqlResource } from '../../app_shared/services/sql-resource.service';


// @Component({

//   templateUrl: './follow-up-requests.component.html',
// })

// export class FollowUpRequestsComponent implements OnInit {

//   isLoading: boolean;
//   errorMessage: string;

//   studentId: number;
//   mentorId: number;
//   mentorReportId: number;
//   mentorReports: Array<MentorReportRPT>;
//   smileys: Array<string>;
//   studentName: string;
//   haveCurrentReport: boolean;
//   constructor(
//               public currRoute: ActivatedRoute,
//               private router: Router,
//               public sqlResource: SqlResource,
//               public session: SessionService) {

//     console.log('monthlyReports constructor');
//     this.smileys = [ '/assets/images/frownSmiley.jpg',
//                     '/assets/images/neutralSmiley.jpg',
//                     '/assets/images/greenSmiley.jpg',
//                     '/assets/images/NA.jpg'
//                     ];
//   }

//  ngOnInit() {
//         console.log('monthlyReports ngOnInit');
//         this.mentorId = this.currRoute.snapshot.params['mentorId'];
//         this.mentorId = this.session.getUserId();
//         console.log('mentorId ' + this.mentorId);
//         // may be undefined at this point:
//         console.log('studentId ' + this.studentId);
//         this.isLoading = true;
//         this.haveCurrentReport = false;
//   }
//   onSelectedStudentName(studentName: string) {
//     console.log('$$$$$$$ got selected NAME event');
//     this.studentName = '' + studentName;
//     this.session.setStudentInContextName(studentName);
//   }

//   onSelectedStudentId(studentId: number) {
//     console.log('$$$$$$$ got selectedId event');
//     this.haveCurrentReport = false;
//     this.studentId = studentId;
//     this.sqlResource.getMentorReportRPTs(this.mentorId, studentId)
//       .subscribe(
//         data => {this.mentorReports = data; },
//         err => console.error('Subscribe error: ' + err),
//         () => {console.log('done: ');
//           this.isLoading = false;
//           for (const x of this.mentorReports) {
//             if (x.sponsorSummaryStatusId === 2086) {
//               console.log('current report found; disable add function');
//               this.haveCurrentReport = true;
//             }
//           }

//         }
//       );
//   }

//   monthlyReportAdd() {
//     if (this.haveCurrentReport) {
// tslint:disable-next-line: max-line-length
//       alert('There is already a report filed for this month. Please use the edit button to edit it. / Ya hay un informe presentado para este mes. Por favor, utilice el botón Editar para editarlo. ');
//     } else {
//       console.log('in monthly-reports: monthlyReportAdd, ready to navigate');
//       if (this.studentId !== null) {
//         const target = '/mentors/monthly-reports-add/' + this.mentorId + '/' + this.studentId;
//         this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
//       }
//     }
//   }

//   monthlyReportEdit(mentorReportId: number) {
//     console.log('in monthly-reports: monthlyReportEdit, ready to navigate');
//     if (this.studentId !== null) {
//       const target = '/mentors/monthly-reports-edit/' + mentorReportId;
//       this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
//     }
//   }
// }
