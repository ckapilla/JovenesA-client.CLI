import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-student-photo',
  templateUrl: './student-photo.component.html'
})
export class StudentPhotoComponent implements OnInit {
  fullPhotoPathname: string;
  photoPathname: string;
  clientUrl: string;
  subscription: Subscription;

  @Select(StudentState.getPhotoPathname) photoPathname$: Observable<string>;

  constructor(urlService: UrlService) {
    console.log('hi from student-photo constructor');
    this.clientUrl = urlService.getClientUrl();

  }

  ngOnInit(): void {
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
