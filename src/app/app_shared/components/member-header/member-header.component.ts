import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-header',
  templateUrl: './member-header.component.html'
})
export class MemberHeaderComponent {

  @Input() memberGUId: string;

  photoPathName: string;


  constructor(
    public router: Router,
  ) {
    console.log('hi from member-header constructor');

  }

  // public onSelectedMemberGUId($event) {
  //   console.log('member-header parent had new GUID event ' + $event);
  //   this.memberGUId = $event;
  // }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent memberHeader has onPhotoPathNameSet called with' + photoPathName);
  }

}
