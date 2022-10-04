import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { FollowUpRequestDTO } from '../../_shared/models/follow-up-requestDTO';
import { SessionService } from '../../_shared/services/session.service';
@Component({
  selector: 'app-follow-up-requests',
  styleUrls: ['./follow-up-requests.component.css'],
  templateUrl: 'follow-up-requests.component.html'
})
export class FollowUpRequestsComponent implements OnInit {
  followUpRequests: FollowUpRequestDTO[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];
  selectedFollowUpStatusId: string;
  selectedActiveStatusId: string;
  errorMessage: string;
  successMessage: string;
  displayCompleteHistory: true;
  showAddDetails: boolean;

  constructor(public followUpData: FollowUpDataService, public router: Router, public session: SessionService) {
    // this.followUpStatuses = constants.followUpStatuses;
    this.followUpStatuses = constants.followUpStatuses;
    // this.selectedFollowUpStatusId = constants.followUpStatuses[0].value;
    this.selectedActiveStatusId = constants.followUpStatuses[0].value;
    // this.showAddDetails = this.selectedFollowUpStatusId === '2092'; // Assigned
  }

  ngOnInit() {
    // this.selectedActiveStatusId  = '2092';
    console.log('calling fetchFilterdData with ' + this.selectedActiveStatusId);
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchFilteredData for FollowUpRequests with ' + this.selectedFollowUpStatusId);
    // this.followUpData.getFollowUpRequestsByStatus(this.selectedFollowUpStatusId).subscribe(
      this.followUpData.getFollowUpRequestDTOByStatus(this.selectedActiveStatusId).subscribe(
      (data) => {
        this.followUpRequests = data;
      },
      (err) => console.error('FollowUpReqs: data error: ' + err),
      () => {
        console.log('done >>');
        console.log(this.followUpRequests);
        console.log('<<');
        this.isLoading = false;
      }
    );
  }

  followUpRequestAdd() {
    const link = ['/admins/follow-up/request-add'];
    console.log('FollowUpRequestAdd, navigate to ' + link[0]);
    this.router.navigate(link);
  }
  setSelectedFollowUpStatus(status: string) {
    this.selectedFollowUpStatusId = status;
    this.fetchFilteredData();
  }
  setActiveStatus(status: string) {
    console.log('setting ActiveStatus ' + status);
    this.selectedActiveStatusId = status;
    this.fetchFilteredData();
  }



}
