import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-sponsors-for-student-grid',
  templateUrl: './sponsors-for-student-grid.component.html'
})

export class SponsorsForStudentGridComponent implements OnInit {
  sponsors: Array<StudentSponsorXRef>;
  sponsorName: string;
  sponsorId: number;
  errorMessage = '';
  @Output() onSelectedSponsorName = new EventEmitter<string>();
  @Output() onSelectedSponsorId = new EventEmitter<number>();
  @Input() studentId: number;

  constructor(public session: SessionService,
            private sqlResource: SqlResource) {

    console.log('in AssignedsponsorComponent constructor with studentId=' + this.studentId);
  }

  public ngOnInit() {
    this.sqlResource.getSponsorsForStudent(this.studentId)
      .subscribe(
        data => { this.sponsors = data; console.log('getSponsorsForStudent'); console.log(this.sponsors[0]); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('sponsors-for-student-grid loaded ' + this.sponsors.length + ' rows');
          if (this.sponsors.length > 0 ) {
            this.selectFirstRow();
          } else {
            this.errorMessage = 'No Assigned Sponsors.';
            // this.onNoAssignedStudents.emit();
          }
        }
      );
  }

  selectFirstRow() {
    console.log('First row Id is ' + this.sponsors[0].sponsorId + ' ' +
      this.sponsors[0].sponsorName); // + ' ' + this.sponsors[0].sponsorLastNames );
      this.setRowClasses(+this.sponsors[0].sponsorId );
      this.selectSponsor(+this.sponsors[0].sponsorId , 0);
  }

  public selectSponsor(sponsorId: number, idx: number) {
    console.log('sponsor selected sponsorId: ' + sponsorId + 'idx: ' + idx );
    const sponsorName: string = this.sponsors[idx].sponsorName; //  + ', ' + this.sponsorMentors[idx].sponsorFirstNames;
    this.sponsorId = sponsorId;
    this.onSelectedSponsorId.emit(sponsorId);
    this.onSelectedSponsorName.emit(sponsorName);

  }
  public setRowClasses(sponsorId: number) {
    // console.log('row SponsorID is ' + sponsorId);
    // console.log('session Assigned sponsor ID is ' + this.session.getAssignedSponsorId());
    const classes =  {
      'success': sponsorId === this.sponsorId,
      'sponsor-row': true,
      'clickable': true
    };
    return classes;
  }
}
