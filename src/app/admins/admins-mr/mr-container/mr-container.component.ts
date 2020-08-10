import { Component } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';


@Component({
  templateUrl: 'mr-container.component.html'
})
export class MentorReportsContainerComponent {

  constructor(auth: AuthService) {
    console.log('mr-container constructor');
  }

}
