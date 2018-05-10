import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionService } from '../../app_shared/services/session.service';
import { RptStudentSponsor } from '../../app_shared/models/student-sponsor';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'assigned-sponsors',
  templateUrl: './assigned-sponsors.component.html',
  styleUrls:  ['./assigned-sponsors.component.css'],
})

export class AssignedSponsorsComponent implements OnInit {
  sponsors: Array<RptStudentSponsor>;
  sponsorName: string;
  sponsorId: number;
  errorMessage = '';
  @Output() onSelectedSponsorName = new EventEmitter<string>();
  @Output() onSelectedSponsorId = new EventEmitter<number>();
  // @Output() onNoAssignedsponsor = new EventEmitter();

  constructor(public session: SessionService,
            private sqlResource: SqlResource) {

    console.log('in AssignedsponsorComponent constructor');
  }

  public ngOnInit() {
    this.sqlResource.getSponsorsForStudent(this.session.getStudentId())
      .subscribe(
        data => { this.sponsors = data; console.log(this.sponsors[0]); },
        err => console.error('Subscribe error: ' + err),
        () => {
                console.log('assigned-sponsor loaded ' + this.sponsors.length + ' rows');
                console.log('first one is ' + this.sponsors[0].sponsorGroupName);
                if (this.sponsors.length > 0 ) {
                  this.selectFirstRow();
                } else {
                  this.errorMessage = 'No Assigned sponsor for this student.';
                  // this.onNoAssignedsponsor.emit();
                }
              }
      );
  }

  selectFirstRow() {
      console.log('First row has SponsorId ' + this.sponsors[0].sponsorGroupId   );
      this.setRowClasses(this.sponsors[0].sponsorGroupId );
      this.selectSponsor(this.sponsors[0].sponsorGroupId , 0);
  }

  public selectSponsor(sponsorId: number, idx: number) {

    console.log('sponsor selected sponsorId: ' + sponsorId + ' idx: ' + this.sponsors[idx] + 'idx: ' + idx );
    const sponsorName: string = this.sponsors[idx].sponsorGroupName;
    this.sponsorId = sponsorId;
    this.onSelectedSponsorId.emit(sponsorId);
    this.onSelectedSponsorName.emit(sponsorName);


  }
  public setRowClasses(sponsorId: number) {
    // console.log('row MemberID is ' + memberId);
    // console.log('session Assigned member ID is ' + this.session.getAssignedMemberId());
    const classes =  {
      'success': true,
      'member-row': true,
      'clickable': true
    };
    return classes;
  }
}
