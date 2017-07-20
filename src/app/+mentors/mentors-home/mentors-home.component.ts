import { Component } from '@angular/core';
import { Auth } from '../../app_shared/services/auth.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ja-home',
  templateUrl: 'mentors-home.component.html'
})
export class MentorsHomeComponent {

  constructor(auth: Auth) {
    // nada
  }

}
