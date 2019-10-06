import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quarterly-home',
  templateUrl: './quarterly-home.component.html'
})
export class QuarterlyHomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }
  studentGUId: string;


  ngOnInit() {
    this.processRouteParams();

  }

  processRouteParams() {
    console.log(' getting studentGUId from queryParams');

    const studentGUIdQueryParam = this.route.snapshot.queryParams['studentGUId'];
    if (studentGUIdQueryParam) {
      console.log('QHome: have studentGUId from route ' + studentGUIdQueryParam);
    }
  }
}
