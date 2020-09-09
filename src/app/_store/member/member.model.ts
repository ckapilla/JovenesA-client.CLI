import { Member } from 'src/app/_shared/models/member';

export interface MemberStateModel {
  members: Member[];
  selectedMemberGUId: string;
  photoPathname: string;
}
