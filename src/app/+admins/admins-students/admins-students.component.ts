
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';

import { StudentDTO } from '../../app_shared/models/studentDTO';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  selector: 'admin-students',
  templateUrl: './admins-students.component.html'
})

export class AdminsStudentsComponent implements OnInit {
  statuses: SELECTITEM[];
  joinedYears: SELECTITEM[];
  gradYears: SELECTITEM[];
  selectedStatus: string;
  selectedYearJoined: string;
  selectedGradYear: string;
  smileys: string[];
  studentDTOs: StudentDTO[];
  isLoading: boolean;

  constructor(
              public sqlResource: SqlResource,
              public router: Router,
              private session: SessionService
              ) {

    console.log('Hi from student List Ctrl controller function');

    this.statuses = [
      { value: '0', label: '[All]' },
      { value: '1003', label: 'Dropped' },
      { value: '1004', label: 'Grad' },
      { value: '1005', label: 'Current' }
    ];

    this.joinedYears = [
      { value: '0', label: '[All]' },
      { value: '2002', label: '2002' }, { value: '2003', label: '2003' },
      { value: '2004', label: '2004' }, { value: '2005', label: '2005' },
      { value: '2006', label: '2006' }, { value: '2007', label: '2007' },
      { value: '2008', label: '2008' }, { value: '2009', label: '2009' },
      { value: '2010', label: '2010' }, { value: '2011', label: '2011' },
      { value: '2012', label: '2012' }, { value: '2013', label: '2013' },
      { value: '2014', label: '2014' }, { value: '2015', label: '2015' },
      {value:'2016', label:'2016'}, {value:'2017', label:'2017'},
      //    {value:'2018', label:'2018'}, {value:'2019', label:'2015'},
      //    {value:'2020', label:'2020'}
    ];

    this.gradYears = [
      { value: '0', label: '[All]' },
      { value: '2004', label: '2004' }, { value: '2005', label: '2005' },
      { value: '2006', label: '2006' }, { value: '2007', label: '2007' },
      { value: '2008', label: '2008' }, { value: '2009', label: '2009' },
      { value: '2010', label: '2010' }, { value: '2011', label: '2011' },
      { value: '2012', label: '2012' }, { value: '2013', label: '2013' },
      { value: '2014', label: '2014' }, { value: '2015', label: '2015' },
      { value: '2016', label: '2016' }, { value: '2017', label: '2017' },
      { value: '2018', label: '2018' }, { value: '2019', label: '2019' },
      { value: '2020', label: '2020' }, { value: '2021', label: '2021' }];

    this.selectedStatus = this.statuses[3].value; // Current
    this.selectedYearJoined = this.joinedYears[0].value; // All[this.joinedYears.length - 1]; // 2015 at time of writing
    this.selectedGradYear = this.gradYears[0].value; // All

    // this.gradeRptsStatus = 'yellowWarning.jpg'
    // this.gpaStatus = 'greenCheck.jpg'

    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];
    this.isLoading = false;
  }



  ngOnInit() {
    console.log('ngOnInit');
    this.fetchFilteredData();
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below
  setSelectedStatus(status: string) {
    // console.log('selected status: ' + status);
    this.selectedStatus = status;
    this.fetchFilteredData();
  }
  setSelectedGradYear(year: string) {
    // console.log('selected year: ' + year);
    this.selectedGradYear = year;
    this.fetchFilteredData();
  }
  setSelectedYearJoined(year: string) {
    // console.log('selected year: ' + year);
    this.selectedYearJoined = year;
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    // console.log('sqlResource for getStudents: ' +
    //        'status: ' + this.selectedStatus + ' ' +
    //        'yearjoined: ' + this.selectedYearJoined +  + ' ' +
    //        'gradyear: ' + this.selectedGradYear
    //        );
    this.isLoading = true;
    this.sqlResource.getStudentDTOs(this.selectedStatus, this.selectedGradYear, this.selectedYearJoined)
      .subscribe(
        data => {this.studentDTOs = data;},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); this.isLoading = false;}
      );
  }
  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setAssignedStudentName(studentName);

    let link = ['/admins/students/student/' + id];
    //let link = ['/admins/students/mentorReports/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoReport(id: number) {
    let link = ['/admins/students/mentorReports/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}
