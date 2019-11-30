import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SponsorGroupMemberDTO } from '../../models/sponsor-group-memberDTO';
import { SessionService } from '../../services/session.service';
import { SponsorGroupDataService } from '../../services/sponsor-group-data.service';

@Component({
  selector: 'app-sponsors-for-student-grid',
  templateUrl: './sponsors-for-student-grid.component.html'
})

export class SponsorsForStudentGridComponent implements OnInit, OnChanges {
  sponsors: Array<SponsorGroupMemberDTO>;
  sponsorName: string;
  // sponsorId: number;
  errorMessage = '';
  @Output() onSelectedSponsorName = new EventEmitter<string>();
  @Output() onSelectedSponsorId = new EventEmitter<number>();
  @Input() studentId: number;
  @Input() sponsorId: number; // only used for change detection

  constructor(public session: SessionService,
    private sponsorGroupData: SponsorGroupDataService) {

    console.log('in ponsorsForStudentGridComponent constructor with studentId=' + this.studentId);
  }

  public ngOnInit() {
    this.sponsorGroupData.getSponsorGroupMembersForStudent(this.studentId)
      .subscribe(
        data => { this.sponsors = data; console.log('getSponsorMembersForStudent'); console.log(this.sponsors[0]); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('sponsors-for-student-grid loaded ');
          if (this.sponsors.length > 0) {
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
    console.log('First row Id is ' + this.sponsors[0].sponsorGroupMemberId + ' ' +
      this.sponsors[0].sponsorGroupMemberName); // + ' ' + this.sponsor.sponsorLastNames );
    this.setRowClasses(+this.sponsors[0].sponsorGroupMemberId);
    this.selectSponsor(+this.sponsors[0].sponsorGroupMemberId, 0);
  }

  public selectSponsor(sponsorId: number, idx: number) {
    console.log('sponsor selected sponsorId: ' + sponsorId + ' idx: ' + idx);
    const sponsorName: string = this.sponsors[idx].sponsorGroupMemberName; //  + ', ' + this.sponsorMentors[idx].sponsorFirstNames;
    this.sponsorId = sponsorId;
    this.onSelectedSponsorId.emit(sponsorId);
    this.onSelectedSponsorName.emit(sponsorName);

  }
  public setRowClasses(sponsorId: number) {
    // console.log('setRowClasses -- row SponsorID is ' + sponsorId);
    // console.log('session Assigned sponsor ID is ' + this.session.getAssignedSponsorId());
    const classes = {
      'table-success': sponsorId === this.sponsorId,
      'sponsor-row': true,
      'clickable': true
    };
    return classes;
  }
}
