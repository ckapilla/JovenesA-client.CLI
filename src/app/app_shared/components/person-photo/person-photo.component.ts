import { Component, Input } from '@angular/core';
import { UrlService } from '../../services/url.service';
@Component({
  selector: 'app-person-photo',
  templateUrl: './person-photo.component.html',
})
export class PersonPhotoComponent {

  @Input() studentGUId: string;
  @Input() photoPathName: string;
  fullPhotoPathName: string;

  constructor(urlService: UrlService

  ) {
    console.log('hi from student-header constructor');
    this.fullPhotoPathName = urlService.getClientUrl() + this.photoPathName;
  }



}
