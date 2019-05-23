import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { SponsorDTO } from '../../models/sponsorDTO';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-sponsors-for-student',
  templateUrl: './sponsors-for-student.component.html',
  styleUrls:  ['./sponsors-for-student.component.css'],
})

export class SponsorsForStudentComponent implements OnInit {
  sponsors: Array<SponsorDTO>;
  sponsorName: string;
  sponsorId: number;
  errorMessage = '';
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
                console.log('first one is ' + this.sponsors[0]);
              }
      );
  }

}
