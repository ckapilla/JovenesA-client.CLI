import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UIState } from 'src/app/_store/ui/ui.state';
import { SponsorGroupDataService } from '../../data/sponsor-group-data.service';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'students-for-sponsor-list',
  templateUrl: './students-for-sponsor-list.html'
})
export class StudentsForSponsorComponent implements OnInit {
  studentsForSponsor: Array<StudentSponsorXRef>;
  smileys: Array<string> = [];
  studentId: number;
  errorMessage = '';
  haveData: boolean;
  displayTestNames: boolean;

  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;

  constructor(
    public session: SessionService,
    private sponsorGroupData: SponsorGroupDataService,
    private router: Router,
    private currRoute: ActivatedRoute
  ) {
    console.log('in SponsoredStudents constructor');
  }

  public ngOnInit() {
    this.haveData = false;

    const guid = this.currRoute.snapshot.params['guid'];
    console.log('++++++++++++++++++++have guid param' + guid);
    this.sponsorGroupData.getStudentsForSponsorByGUId(guid).subscribe(
      (data) => {
        this.studentsForSponsor = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item['studentName'] !== '_Test, _Student') {
            return item;
          }
        });
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('students-for-sponsor-list loaded ' + this.studentsForSponsor.length + ' rows');
        if (this.studentsForSponsor.length > 0) {
          console.log(this.studentsForSponsor[0].studentName);
          this.haveData = true;
        } else {
          //
        }
      }
    );
  }
  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    // XXYYZZ this.session.setStudentInContextName(studentName);
    const link = ['admins/students/student', { id: id }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
}
