
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from '../../../app_shared/constants/constants';
import { SELECTITEM } from '../../../app_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../../app_shared/interfaces/SORTCRITERIA';
import { MemberWithAnyRelatedStudent } from '../../../app_shared/models/member-with-any-related-student';
import { ColumnSortService } from '../../../app_shared/services/column-sort.service';
import { SessionService } from '../../../app_shared/services/session.service';
import { SqlResource } from '../../../app_shared/services/sql-resource.service';


@Component({
  templateUrl: './admins-member-list.component.html',
  styleUrls: ['./admins-member-list.component.css']
})

export class AdminsMemberListComponent implements OnInit {
  memberTypes: SELECTITEM[];
  _selectedType: SELECTITEM;
  memberStatuses: SELECTITEM[];
  _selectedStatus: SELECTITEM;
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
    this.memberStatuses = constants.memberStatuses;
    this.memberTypes = constants.memberTypes;
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
    console.log('types[2] = ' + this.memberTypes[2].label);
    const memType = this.session.getMemberType();
    let idx = 2;
    if (memType) {
      idx = this.memberTypes.findIndex(x => x.value === memType.value);
      console.log('setting MemberType to saved ' + memType);
    }
    this._selectedType = this.memberTypes[idx];
    console.log('statuses[0] = ' + this.memberStatuses[0].value);
    this._selectedStatus = this.memberStatuses[0];
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
  gotoMember(guid: string, memberName: string) {

    const link = ['admins/members/member', { guid: guid }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);

    // const link = ['/admins/students/student', id];
    const link = ['admins/students/student', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  gotoMemberSearch() {
    const link = '/admins/members';
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }


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
