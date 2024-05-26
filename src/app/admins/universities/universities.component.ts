import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UniversityDataService } from '../../_shared/data/university-data.service';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { University } from '../../_shared/models/university';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { UIState } from '../../_store/ui/ui.state';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: [ './universities.component.css' ]
})
export class UniversitiesComponent implements OnInit {
  universities: University[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  displayTestNames: boolean;

   testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);

  constructor(
    public universityData: UniversityDataService,
    public router: Router,
    private columnSorter: ColumnSortService,
    private store: Store
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below

  fetchData() {
    this.isLoading = true;
    console.log('in fetchFilteredData');
    this.universityData.getUniversities().subscribe(
      (data) => {
        this.universities = data.filter((item) => {

          return item;
        });
      },
      (err) => (this.errorMessage = err),
      () => {
        console.log('done' + this.universities[0].universityId);
        this.isLoading = false;
      }
    );
  }


  editUniversity(id: number) {
    const link = [ '/admins/university/' + id ];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  addNewUniversity(universityName: string) {
    if (!universityName || universityName.length < 5) {
      alert('University Name must be at least 5 characters long');
      return;
    }
    const sg = new University();
    sg.universityName = universityName;

    console.log('adding universityName ' + sg.universityName);
    this.universityData.addNewUniversity(sg).subscribe(
      () => {
        console.log((this.successMessage = 'New University ' + universityName + ' added successfully'));
        this.isLoading = false;
        this.fetchData();
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        console.log((this.errorMessage = error));
        this.isLoading = false;
      }
    );
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.universities.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted() {
    console.log('sorted event received');
  }
}
