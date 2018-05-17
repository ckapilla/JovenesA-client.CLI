import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource.service';
import { SessionService } from '../../app_shared/services/session.service';
import { SponsorLetter } from '../../app_shared/models/sponsor-letter';
import { StudentDTO} from '../../app_shared/models/studentDTO';


@Component({

  templateUrl: './students-sponsor-letters.component.html',
  styleUrls: ['./students-sponsor-letters.component.css'],
})

export class StudentsSponsorLettersComponent implements OnInit {

  isLoading: boolean;
  errorMessage: string;
  studentId: number;
  student: StudentDTO;
  sponsorLetters: Array<SponsorLetter>;
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
    this.isLoading = true;
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
      () => { console.log('done: ');
        this.isLoading = false;
      }
    );
  }

  sponsorLetterAdd() {
    const target = 'students/sponsor-letters-add/' + this.studentId  + '/' + this.sponsorId;
    console.log('in students-sponsor-letters: ready to navigate to' + target);
    this.router.navigateByUrl(target);
  }
}