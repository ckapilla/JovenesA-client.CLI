import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  template: `
  <pre *ngIf="auth.userProfile$ | async as profile">
  <code>{{ profile | json }}</code>
  </pre>`
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
