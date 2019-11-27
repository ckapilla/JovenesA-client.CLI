import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-student-header-sponsors',
  templateUrl: './student-header-sponsors.component.html'
})
export class StudentHeaderSponsorsComponent {

  @Input() studentGUId: string;
  photoPathName: string;

  constructor(

  ) {
    console.log('hi from student-header-sponsors constructor');

  }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
  }
}
