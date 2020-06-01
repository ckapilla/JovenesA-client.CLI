import { Component } from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service';


@Component({
  templateUrl: 'mr-container.component.html'
})
export class MentorReportsContainerComponent {

  constructor(auth: AuthService) {
    // nada
  }

}
