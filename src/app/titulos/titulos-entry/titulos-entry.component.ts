import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { TituloDataService } from '../../_shared/data/titulo-data.service';
import { TitulosReceivedDTO } from '../../_shared/models/titulos-receivedDTO';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './titulos-entry.component.html'
})
export class TitulosEntryComponent implements OnInit {
  myForm: UntypedFormGroup;
  titulosData: TitulosReceivedDTO[];
  entry: TitulosReceivedDTO;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  studentGUId: string;
  private subscription: Subscription;
  studentName: string;
  confirmedDateB: boolean;
  inGradesProcessingPeriod: boolean;

  //  currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
  //  currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public tituloData: TituloDataService,
    public router: Router,
    // private route: ActivatedRoute,
    private session: SessionService,
    public location: Location,
    private store: Store
  ) {
    this.isLoading = false;
  }


  ngOnInit() {
    this.studentGUId = this.session.getStudentRecordGUId();
    console.log('titulosEntry/Upload ngOnInit, studentGUID = ' + this.studentGUId);
  }


}
