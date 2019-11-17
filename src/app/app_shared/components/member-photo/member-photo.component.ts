import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UrlService } from '../../services/url.service';
@Component({
  selector: 'app-member-photo',
  templateUrl: './member-photo.component.html',
})
export class MemberPhotoComponent implements OnChanges {

  @Input() studentGUId: string;
  @Input() photoPathName: string;
  fullPhotoPathName: string;
  clientUrl: string;

  constructor(urlService: UrlService

  ) {
    console.log('hi from student-header constructor');
    this.clientUrl = urlService.getClientUrl();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.photoPathName) {
      if (this.photoPathName) {
        this.fullPhotoPathName = this.clientUrl + '/assets/images/MemberPhotos/' + this.photoPathName;
        // this.fullPhotoPathName = this.clientUrl + '/assets/images/MemberPhotos/N-a, N-a.jpg';
        console.log('MemberPhoto: changes has fullPhotoPathName:' + this.fullPhotoPathName);
      }
    }
  }
}
