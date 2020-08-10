import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ServerEnvironmentComponent } from './server-environment/server-environment.component';
@Component({
  templateUrl: 'utilities.component.html',
  styleUrls: ['utilities.component.css']
})

export class UtilitiesComponent implements OnInit, OnDestroy {

  selectedReport: string;
  componentRef: any;

  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  readonly reports = [
    { value: '', comp: '', label: '[None]' },
    { value: '1', comp: ServerEnvironmentComponent, label: 'Server Environment' },
  ];

  @ViewChild('reportcontainer', { read: ViewContainerRef, static: true })
  entry: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver
  ) {

    this.isLoading = false;
  }

  ngOnInit() {
    this.selectedReport = '';
  }


  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  setSelectedReport(reportNum: string) {
    if (reportNum > '0') {
      console.log('selected ' + this.reports[+reportNum].label);
      this.createComponent(this.reports[+reportNum].comp);
    }
  }

  createComponent(compRef: any) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(compRef);
    this.componentRef = this.entry.createComponent(factory);
  }

}
