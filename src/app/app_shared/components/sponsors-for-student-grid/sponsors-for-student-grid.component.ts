import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-sponsors-for-student-grid',
  templateUrl: './sponsors-for-student-grid.component.html'
})

export class SponsorsForStudentGridComponent implements OnInit {
  sponsorGroups: Array<StudentSponsorXRef>;
  sponsorGroupName: string;
  sponsorGroupId: number;
  errorMessage = '';
  @Output() onSelectedSponsorGroupName = new EventEmitter<string>();
  @Output() onSelectedSponsorGroupId = new EventEmitter<number>();

  constructor(public session: SessionService,
            private sqlResource: SqlResource) {

    console.log('in AssignedsponsorComponent constructor');
  }

  public ngOnInit() {
    this.sqlResource.getSponsorGroupsForStudent(this.session.getStudentId())
      .subscribe(
        data => { this.sponsorGroups = data; console.log(this.sponsorGroups[0]); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('sponsors-for-student-grid loaded ' + this.sponsorGroups.length + ' rows');
          if (this.sponsorGroups.length > 0 ) {
            this.selectFirstRow();
          } else {
            this.errorMessage = 'No Assigned Sponsors.';
            // this.onNoAssignedStudents.emit();
          }
        }
      );
  }

  selectFirstRow() {
    console.log('First row Id is ' + this.sponsorGroups[0].sponsorGroupId + ' ' +
      this.sponsorGroups[0].sponsorGroupName); // + ' ' + this.sponsorGroups[0].sponsorLastNames );
      this.setRowClasses(+this.sponsorGroups[0].sponsorGroupId );
      this.selectSponsor(+this.sponsorGroups[0].sponsorGroupId , 0);
  }

  public selectSponsor(sponsorGroupId: number, idx: number) {
    console.log('sponsor selected sponsorGroupId: ' + sponsorGroupId + 'idx: ' + idx );
    const sponsorGroupName: string = this.sponsorGroups[idx].sponsorName; //  + ', ' + this.sponsorMentors[idx].sponsorFirstNames;
    this.sponsorGroupId = sponsorGroupId;
    this.onSelectedSponsorGroupId.emit(sponsorGroupId);
    this.onSelectedSponsorGroupName.emit(sponsorGroupName);

  }
  public setRowClasses(sponsorGroupId: number) {
    // console.log('row SponsorID is ' + sponsorId);
    // console.log('session Assigned sponsor ID is ' + this.session.getAssignedSponsorId());
    const classes =  {
      'success': sponsorGroupId === this.sponsorGroupId,
      'sponsor-row': true,
      'clickable': true
    };
    return classes;
  }
}
