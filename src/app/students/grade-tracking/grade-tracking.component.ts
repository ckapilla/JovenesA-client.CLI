import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../_shared/services/session.service';

@Component({

  templateUrl: 'grade-tracking.component.html'
})
export class GradeTrackingComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(public router: Router,
    public session: SessionService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
  }
}
