
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { MemberWithAnyRelatedStudent } from '../../app_shared/models/member-with-any-related-student';
import { ColumnSortService } from '../../app_shared/services/column-sort.service';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';


@Component({
  templateUrl: './admins-members.component.html',
  styleUrls: ['./admins-members.component.css']
})

export class AdminsMembersComponent implements OnInit {
  types: SELECTITEM[];
  _selectedType: SELECTITEM;
  statuses: SELECTITEM[];
  _selectedStatus: SELECTITEM;
  smileys: string[];
  members: MemberWithAnyRelatedStudent[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;



  constructor(
              public sqlResource: SqlResource,
              public router: Router,
              private session: SessionService,
              private columnSorter: ColumnSortService
              ) {

    console.log('Hi from member List Ctrl controller function');

    this.statuses = [
      { value: '0', label: '[All]' },
      { value: '1015', label: 'Active' },
      { value: '1016', label: 'Inactive Temporary' },
      { value: '1017', label: 'Inactive Permanent' },
      { value: '2055', label: 'Deceased' }
    ];
    console.log('constructor statuses[1] = ' + this.statuses[1].value);
    this.types = [
      { value: '2068', label: 'Admin' },
      { value: '1012', label: 'Employee' },
      { value: '1010', label: 'Mentor' },
      // { value: '2072', label: 'NonPerson' },
      { value: '2041', label: 'Pledger' },
      // { value: '2040', label: 'President' },
      // { value: '2067', label: '[All]' },
      { value: '1009', label: 'Sponsor' },
      // { value: '2069', label: 'Student' },
      { value: '1008', label: 'Volunteer' }
    ];

    this.smileys = [ '/assets/images/needsAttention.jpg',
                    '/assets/images/thumbsUp.jpg',
                    '/assets/images/celebrate.jpg',
                    '/assets/images/NA.jpg'
                    ];
    this.isLoading = false;

  }

  public set selectedStatus(status: SELECTITEM) {
    this._selectedStatus = status;
    this.fetchFilteredData();
  }

  public get selectedStatus() {
    return this._selectedStatus;
  }

  public set selectedType(type: SELECTITEM) {
    this._selectedType = type;
    this.session.setMemberType(type);
    this.fetchFilteredData();
  }
  public get selectedType() {
    return this._selectedType;
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log('types[2] = ' + this.types[2].label);
    const memType = this.session.getMemberType();
    let idx = 2;
    if (memType) {
      idx = this.types.findIndex(x => x.value === memType.value);
      console.log('setting MemberType to saved ' + memType);
    }
    this._selectedType = this.types[idx];
    console.log('statuses[1] = ' + this.statuses[1].value);
    this._selectedStatus = this.statuses[1];
    this.fetchFilteredData();
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below


  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchFilteredData');
    this.sqlResource.getMemberWithAnyRelatedStudent(this.selectedType.label, Number(this.selectedStatus.value))
      .subscribe(
        data => { this.members = data; },
        err => this.errorMessage = err,
        () => { console.log('done' + this.members[0].memberStatusId); this.isLoading = false; }
      );
  }
  gotoMember(id: number, memberName: string) {
    console.log('setting memberName to ' + memberName);
    // this.session.setAssignedMemberName(memberName);

    const link = ['/admins/members/member/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);

    // const link = ['/admins/students/student', id];
    const link = ['admins/students/student', { id: id }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  // gotoCommunications(id: number, memberName: string) {
  //   const link = ['/admins/members/communications/' + id];
  //   console.log('navigating to ' + link);
  //   this.router.navigate(link);
  // }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log(
      'parent received sortColumnCLick event with ' + sortCriteria.sortColumn
    );
    return this.members.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }
}
