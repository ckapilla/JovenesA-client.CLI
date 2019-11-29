import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confidential-home',
  templateUrl: './confidential-quarterly.component.html'
})
export class ConfidentialQuarterlyComponent implements OnInit {

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
      console.log('ConfHome: have studentGUId from route ' + studentGUIdQueryParam);
    }
  }
}
