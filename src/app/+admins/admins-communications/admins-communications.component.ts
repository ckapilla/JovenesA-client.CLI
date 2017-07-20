
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';

import { Communication } from '../../app_shared/models/communication';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  selector: 'admin-members',
  templateUrl: './admins-communications.component.html',
  styleUrls:  ['./admins-communications.component.css'],
})

export class AdminsCommunicationsComponent implements OnInit {
  types: SELECTITEM[];
  _selectedType: SELECTITEM;
  //selectedTypeLabel: string;
  smileys: string[];
  communications: Communication[];
  isLoading: boolean;

  constructor(
              public currRoute: ActivatedRoute,
              public sqlResource: SqlResource,
              public router: Router,
              private session: SessionService
              ) {

    console.log('Hi from member List Ctrl controller function');

    this.types = [
      //{ value: '0', label: '[All]' },
      { value: '2068', label: 'Admin' },
      { value: '1007', label: 'BoardMember' },
      { value: '1013', label: 'Donor' },



      { value: '1012', label: 'Employee' },
      //{ value: '1011', label: 'ESOLTutor' },
      { value: '1010', label: 'Mentor' },
      { value: '2072', label: 'NonPerson' },
      { value: '2041', label: 'Pledger' },
      { value: '2040', label: 'President' },

      //{ value: '2066', label: 'LegacyDonor' },
      //{ value: '2067', label: '[All]' },
      { value: '1009', label: 'Sponsor' },
      //{ value: '2069', label: 'Student' },
      { value: '1008', label: 'Volunteer' }
    ];


    //this.selectedTypeLabel = this.types[3].label;
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
    let Id = this.currRoute.snapshot.params['id'];
    this.fetchFilteredData(Id);
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below

  fetchFilteredData(memberId: number) {
    console.log('>>>>sqlResource for getCommunicationsForMember: ' +
           'memberId: ' + memberId
           );
    this.isLoading = true;
    this.sqlResource.getCommunicationsForMember(memberId)
      .subscribe(
        data => {this.communications = data;
          console.log('subscribe data is ' , this.communications);},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done is', this.communications); this.isLoading = false;}
      );
  }

  communicationAdd(memberId: number, memberName: string) {
    console.log('in communication: communicationAdd, ready to navigate');
    //this.studentId = this.session.getAssignedStudentId();
    let target = '/admins/members/communications-add/' + memberId;
    this.router.navigateByUrl(target);//, //{mentorId: this.mentorId, studentId: this.studentId}]);

  }

}
