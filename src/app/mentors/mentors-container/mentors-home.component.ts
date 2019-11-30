import { Component } from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service';


@Component({
  templateUrl: 'mentors-container.component.html'
})
export class MentorsHomeComponent {

  constructor(auth: AuthService) {
    // nada
  }

}
