
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { MentorReportsSubmittedComponent } from '../mentor-reports-submitted/mentor-reports-submitted.component';
import { SponsorSummariesSentComponent } from '../sponsor-summaries-sent/sponsor-summaries-sent.component';

@Component({
  templateUrl: 'reports-home.component.html',
  styleUrls: ['reports-home.component.css']
})

export class ReportsHomeComponent implements OnDestroy {

  selectedReport: string;
  componentRef: any;

  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  readonly reports = [
    { value: '', comp: '', label: '[None]' },
    { value: '1', comp: MentorReportsSubmittedComponent, label: 'Mentor Reports Submitted' },
    { value: '2', comp: SponsorSummariesSentComponent, label: 'Sponsor Summaries Sent' },
  ];

  @ViewChild('reportcontainer', { read: ViewContainerRef, static: false })
  entry: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver
  ) {
    this.selectedReport = '';
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  createComponent(compRef: any) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(compRef);
    const componentRef = this.entry.createComponent(factory);
  }

  setSelectedReport(reportNum: string) {
    if (reportNum > '0') {
      console.log('selected ' + this.reports[+reportNum].label);
      this.createComponent(this.reports[+reportNum].comp);
    }
  }
}
