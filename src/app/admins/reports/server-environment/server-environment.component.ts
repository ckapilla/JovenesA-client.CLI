import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-environment',
  templateUrl: './server-environment.component.html'
})

export class ServerEnvironmentComponent implements OnInit, OnDestroy {

  constructor(
  ) {
    console.log('hi from server-environment constructor');

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
