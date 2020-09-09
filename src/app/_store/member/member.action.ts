import { MemberStateModel } from './member.model';

export class GetMembers {
  static readonly type = '[Member Lookup Component] Get Members';
  constructor(public payload: MemberStateModel) {}
}

export class SetSelectedMemberGUId {
  static readonly type = '[Member Selection] update memberGUId';
  constructor(public payload: string) {}
}

export class SetPhotoPathname {
  static readonly type = '[Member Header] update photoPathname';
  constructor(public readonly payload: string) {}
}
