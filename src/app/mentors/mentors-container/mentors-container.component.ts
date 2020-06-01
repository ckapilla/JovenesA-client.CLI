import { Component } from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service';


@Component({
  templateUrl: 'mentors-container.component.html'
})
export class MentorsContainerComponent {

  constructor(auth: AuthService) {
    // nada
  }

}
