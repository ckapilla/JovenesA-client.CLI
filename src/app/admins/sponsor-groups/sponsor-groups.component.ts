import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorGroup } from 'src/app/app_shared/models/sponsor-group';
import { SponsorGroupMemberDTO } from 'src/app/app_shared/models/sponsor-group-memberDTO';
import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { ColumnSortService } from '../../app_shared/services/column-sort.service';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  selector: 'app-sponsor-groups',
  templateUrl: './sponsor-groups.component.html'
})
export class SponsorGroupsComponent implements OnInit {
  sponsorGroups: SponsorGroupMemberDTO[];
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
    this.isLoading = false;
  }


  ngOnInit() {

    this.fetchData();
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below


  fetchData() {
    this.isLoading = true;
    console.log('in fetchFilteredData');
    this.sqlResource.getSponsorGroupsWithMembers()
      .subscribe(
        data => { this.sponsorGroups = data; },
        err => this.errorMessage = err,
        () => { console.log('done' + this.sponsorGroups[0].sponsorGroupId); this.isLoading = false; }
      );
  }
  gotoMember(id: number, memberName: string) {
    console.log('setting memberName to ' + memberName);
    // this.session.setAssignedMemberName(memberName);

    const link = ['/admins/members/member/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  editSponsorGroup(id: number) {
    const link = ['/admins/sponsor-group/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  addNewSponsorGroup(sponsorGroupName: string) {

    if (!sponsorGroupName || sponsorGroupName.length < 5) {
      alert('Sponsor Group Name must be at least 5 characters long');
      return;
    }
    const sg = new SponsorGroup();
    sg.sponsorGroupName = sponsorGroupName;

    console.log('adding sponsorGroupName ' + sg.sponsorGroupName);
    this.sqlResource.addNewSponsorGroup(sg).subscribe(
      (sponsorGroup) => {
        console.log(this.successMessage = 'New SponsorGroup ' + sponsorGroupName + ' added successfully');
        this.isLoading = false;
        this.fetchData();
        window.setTimeout(() => {// console.log('clearing success message');
          this.successMessage = '';
        }, 3000);


      },
      (error) => {
        console.log(this.errorMessage = <any>error);
        this.isLoading = false;
      }


    );
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log(
      'parent received sortColumnCLick event with ' + sortCriteria.sortColumn
    );
    return this.sponsorGroups.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }
}
