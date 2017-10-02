import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';
import { RptSponsorLetter } from '../../app_shared/models/sponsor-letter';
import { StudentDTO} from '../../app_shared/models/studentDTO';


@Component({
  moduleId: module.id,
  templateUrl: './students-sponsor-letters.component.html',
  styleUrls: ['./students-sponsor-letters.component.css'],
})

export class StudentsSponsorLettersComponent implements OnInit {

  isLoading: boolean;
  errorMessage: string;
  studentId: number;
  student: StudentDTO;
  sponsorLetters: Array<RptSponsorLetter>;
  sponsorName: string;
  sponsorId: number;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    public session: SessionService) {

    console.log('sponsorLetters constructor');
  }

  ngOnInit() {
    console.log('sponsorLetters ngOnInit');

    this.studentId = this.currRoute.snapshot.params['id'];
    // may be undefined at this point:
    console.log('studentId ' + this.studentId);

  }

  onSelectedSponsorName(sponsorName: string) {
    // console.log('$$$$$$$ got selected NAME event');
    this.sponsorName = '' + sponsorName;
  }

  onSelectedSponsorId(sponsorId: number) {
    console.log('$$$$$$$ got selectedId event sponsorId: ' + sponsorId);
    this.sponsorId = sponsorId;
    this.sqlResource.getSponsorLetters( this.studentId, sponsorId)
      .subscribe(
      data => { this.sponsorLetters = data; },
      err => console.error('Subscribe error: ' + err),
      () => console.log('done: ')
      );
  }

  sponsorLetterAdd() {
    console.log('in students-donor-letters: sponsorLettertAdd, ready to navigate');
    const target = '/students/sponsor-letters-add/' + this.studentId  + '/' + this.sponsorId;
    this.router.navigateByUrl(target);
  }
}
