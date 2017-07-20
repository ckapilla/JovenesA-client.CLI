import { Component } from '@angular/core';
import { Auth } from '../app_shared/services/auth.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ja-home',
  templateUrl: 'error.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  constructor(public auth: Auth) {

  }

}
