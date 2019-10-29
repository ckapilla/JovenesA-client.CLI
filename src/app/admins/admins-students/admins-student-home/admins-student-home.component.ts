import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admins-student-home',
  templateUrl: './admins-student-home.component.html',
  styleUrls: ['./admins-student-home.component.css']
})
export class AdminsStudentHomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }
  studentGUId: string;


  ngOnInit() {
    this.processRouteParams();

  }

  processRouteParams() {

  }
}
