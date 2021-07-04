import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';

@Component({
  selector: 'app-admins_student-container',
  templateUrl: '../admins-student-container/admins-student-container.component.html'
})
export class AdminsStudentContainerComponent implements OnInit {
  selectedQRPeriod = '';
  studentGUId: string;
  studentGUIdReceived: boolean;
  readonly activeQRPeriods: SELECTITEM[] = constants.activeQRperiods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store) {

  }

  ngOnInit() {

  }

}
