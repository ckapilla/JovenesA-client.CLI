import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-student-photo',
  templateUrl: './student-photo.component.html'
})
export class StudentPhotoComponent implements OnChanges {
  @Input() photoPathName: string;
  fullPhotoPathName: string;
  clientUrl: string;

  constructor() {
    console.log('hi from student-header constructor');
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.photoPathName) {
      if (this.photoPathName) {
        this.fullPhotoPathName = this.clientUrl + '/assets/images/StudentPhotos/' + this.photoPathName;
        // this.fullPhotoPathName = this.clientUrl + '/assets/images/MemberPhotos/N-a, N-a.jpg';
        console.log('StudentPhoto: changes has fullPhotoPathName:' + this.fullPhotoPathName);
      }
    }
  }
}
