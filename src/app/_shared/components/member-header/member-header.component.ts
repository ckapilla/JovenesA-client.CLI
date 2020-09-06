import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MemberState } from 'src/app/_store/member/member.state';

@Component({
  selector: 'app-member-header',
  templateUrl: './member-header.component.html'
})
export class MemberHeaderComponent implements OnInit {
  photoPathName: string;
  private subscription: Subscription;
  public memberGUId: string;

  @Select(MemberState.getSelectedMemberGUId) currentGUId$: Observable<string>;

  constructor(
    public router: Router // private selectedMember: SelectedMember
  ) {
    console.log('hi from member-header constructor');
  }

  ngOnInit() {
    this.subscribeForMemberGUIds2();
  }

  subscribeForMemberGUIds2() {
    // console.log('header set up memberGUId subscription');
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.memberGUId = message;
      console.log('************NGXS: header new MemberGUId received' + this.memberGUId);
    });
  }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent memberHeader has onPhotoPathNameSet called with' + photoPathName);
  }
}
