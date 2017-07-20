
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';

import { MemberStudentRelations } from '../../app_shared/models/member-student-relations';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  selector: 'admin-members',
  templateUrl: './admins-members.component.html',
  styleUrls:  ['./admins-members.component.css'],
})

export class AdminsMembersComponent implements OnInit {
  types: SELECTITEM[];
  _selectedType: SELECTITEM;
  //selectedTypeLabel: string;
  smileys: string[];
  members: MemberStudentRelations[];
  isLoading: boolean;

  constructor(
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

  set selectedType(value: SELECTITEM) {
    // console.log('selected type: ' + objValue);
    this._selectedType = value;
    this.fetchFilteredData(value.label);
  }

  get selectedType(): SELECTITEM {
    return this._selectedType;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.selectedType = this.types[3];
    this.fetchFilteredData(this.selectedType.label);
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below


  fetchFilteredData(type: string) {
    // console.log('sqlResource for getMembers: ' +
    //        'status: ' + this.selectedStatus + ' ' +
    //        'yearjoined: ' + this.selectedYearJoined +  + ' ' +
    //        'gradyear: ' + this.selectedGradYear
    //        );
    this.isLoading = true;
    this.sqlResource.getMemberStudentRelations(type)
      .subscribe(
        data => {this.members = data;},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); this.isLoading = false;}
      );
  }
  gotoMember(id: number, memberName: string) {
    console.log('setting memberName to ' + memberName);
    //this.session.setAssignedMemberName(memberName);

    let link = ['/admins/members/member/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoCommunications(id: number, memberName: string) {
    let link = ['/admins/members/communications/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
}
