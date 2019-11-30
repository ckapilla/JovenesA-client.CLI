import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  template: `Callback Component Page`,
  selector: 'app-callback'
})
export class CallbackComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.handleAuthCallback();
  }
}
