import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MemberState } from 'src/app/_store/member/member.state';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-member-photo',
  templateUrl: './member-photo.component.html'
})
export class MemberPhotoComponent {
  fullPhotoPathname: string;
  photoPathname: string;
  clientUrl: string;
  subscription: Subscription;

  @Select(MemberState.getPhotoPathname) photoPathname$: Observable<string>;

  constructor(urlService: UrlService) {
    this.clientUrl = urlService.getClientUrl();
    this.subscribeForPhotoPathname();
  }

  subscribeForPhotoPathname() {
    this.subscription = this.photoPathname$.subscribe((message) => {
      this.photoPathname = message;
      console.log('************NGXS: photoPathname received' + this.photoPathname);
      this.fullPhotoPathname = this.clientUrl + '/assets/images/StudentPhotos/' + this.photoPathname;
    });
  }
}
