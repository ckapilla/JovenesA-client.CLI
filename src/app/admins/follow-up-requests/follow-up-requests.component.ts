import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { FollowUpRequestRPT } from '../../_shared/models/follow-up-requestRPT';
import { SessionService } from '../../_shared/services/session.service';
@Component({
  selector: 'app-follow-up-requests',
  styleUrls: ['./follow-up-requests.component.css'],
  templateUrl: 'follow-up-requests.component.html'
})
export class FollowUpRequestsComponent implements OnInit {
  followUpRequests: FollowUpRequestRPT[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];
  selectedFollowUpStatusId: string;
  errorMessage: string;
  successMessage: string;
  studentName: string;
  displayCompleteHistory: true;
  showAddDetails: boolean;

  constructor(public followUpData: FollowUpDataService, public router: Router, public session: SessionService) {
    this.followUpStatuses = constants.followUpStatuses;
    this.selectedFollowUpStatusId = constants.followUpStatuses[1].value;
    this.showAddDetails = this.selectedFollowUpStatusId === '2092'; // Assigned
  }

  ngOnInit() {
    console.log('calling fetchFilterdData with ' + this.selectedFollowUpStatusId);
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchFilteredData for FollowUpRequests');
    this.followUpData.getFollowUpRequests(this.selectedFollowUpStatusId).subscribe(
      (data) => {
        this.followUpRequests = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done >>');
        console.log(this.followUpRequests);
        console.log('<<');
        this.isLoading = false;
      }
    );
  }
  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const target = '/admins/follow-up-requests-add';
    this.router.navigateByUrl(target);
  }
  setSelectedFollowUpStatus(status: string) {
    this.selectedFollowUpStatusId = status;
    this.showAddDetails = this.selectedFollowUpStatusId === '2092'; // Assigned
    this.fetchFilteredData();
  }
}
