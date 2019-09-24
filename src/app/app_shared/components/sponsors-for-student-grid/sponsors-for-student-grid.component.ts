import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-sponsors-for-student-grid',
  templateUrl: './sponsors-for-student-grid.component.html'
})

export class SponsorsForStudentGridComponent implements OnInit, OnChanges {
  sponsorGroup: StudentSponsorXRef;
  sponsorName: string;
  // sponsorId: number;
  errorMessage = '';
  @Output() onSelectedSponsorGroupName = new EventEmitter<string>();
  @Output() onSelectedSponsorGroupId = new EventEmitter<number>();
  @Input() studentId: number;
  @Input() sponsorGroupId: number; // only used for change detection

  constructor(public session: SessionService,
    private sqlResource: SqlResource) {

    console.log('in ponsorsForStudentGridComponent constructor with studentId=' + this.studentId);
  }

  public ngOnInit() {
    this.sqlResource.getSponsorGroupForStudent(this.studentId)
      .subscribe(
        data => { this.sponsorGroup = data[0]; console.log('getSponsorGroupMembersForStudent'); console.log(this.sponsorGroup); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('sponsors-for-student-grid loaded ');
          if (this.sponsorGroup) {
            this.selectFirstRow();
          } else {
            this.errorMessage = 'No Assigned Sponsors.';
            // this.onNoAssignedStudents.emit();
          }
        }
      );
  }

  public ngOnChanges() {
    // console.log('child had new inpout');
    // this.ngOnInit();
  }

  selectFirstRow() {
    console.log('First row Id is ' + this.sponsorGroup.sponsorGroupId + ' ' +
      this.sponsorGroup.sponsorGroupName); // + ' ' + this.sponsorGroup.sponsorLastNames );
    this.setRowClasses(+this.sponsorGroup.sponsorGroupId);
    this.selectSponsorGroup(+this.sponsorGroup.sponsorGroupId, 0);
  }

  public selectSponsorGroup(sponsorGroupId: number, idx: number) {
    console.log('sponsor selected sponsorId: ' + sponsorGroupId + ' idx: ' + idx);
    const sponsorGroupName: string = this.sponsorGroup.sponsorName; //  + ', ' + this.sponsorMentors[idx].sponsorFirstNames;
    this.sponsorGroupId = sponsorGroupId;
    this.onSelectedSponsorGroupId.emit(sponsorGroupId);
    this.onSelectedSponsorGroupName.emit(sponsorGroupName);

  }
  public setRowClasses(sponsorGroupId: number) {
    // console.log('setRowClasses -- row SponsorID is ' + sponsorGroupId);
    // console.log('session Assigned sponsor ID is ' + this.session.getAssignedSponsorId());
    const classes = {
      'table-success': sponsorGroupId === this.sponsorGroupId,
      'sponsor-row': true,
      'clickable': true
    };
    return classes;
  }
}
