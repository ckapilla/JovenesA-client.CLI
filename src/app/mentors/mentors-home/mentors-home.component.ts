import { Component } from '@angular/core';
import { AuthService } from '../../app_shared/services/auth.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({

  templateUrl: 'mentors-home.component.html'
})
export class MentorsHomeComponent {

  constructor(auth: AuthService) {
    // nada
  }

}
