import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpRequestDTO } from '../../models/follow-up-requestDTO';

@Component({
  selector: 'app-follow-up-requests-list',
  templateUrl: './follow-up-requests-list.component.html'
})
export class FollowUpRequestsListComponent {
  @Input() followUpRequests: FollowUpRequestDTO[];
  // @Input() displayCompleteHistory: boolean;
  @Input() showAddDetails: boolean;
  displayCompleteHistory = false;

  studentId: number;
  currentHistoryText_EN: string;
  currentHistoryText_ES: string;
  currentRequestId =0;

  constructor(private router: Router) {
    console.log('FollowUpRequestsListComponent constructor');
  }

  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const link = ['/admins/follow-up/requests-add'];
    this.router.navigate(link);
  }

  editFollowUpRequest(requestId: number) {
    console.log('edit has index ' + requestId)
    const link: [string, { requestId: number; }] = [
      '/admins/follow-up/request-edit', { requestId: requestId }]
    this.router.navigate(link);
    console.log('navigating to ' + link);


  }

  setSelectedRow(idx : number) {
    console.log('set selected idx: ' + idx );
    this.currentRequestId = idx;
  }

  clearSelectedRow() {
    console.log('clear selected idx');
    this.currentRequestId = 0;
  }

  gotoStudent(guid: string) {
    if (guid && guid.length > 0) {
      const link = ['admins/students/student-container', { guid: guid }];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }

}
