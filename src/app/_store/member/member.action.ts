import { MemberStateModel } from './member.model';

export class GetMembers {
  static readonly type = '[Member Lookup Component] Get Members';
  constructor(public payload: MemberStateModel) {}
}

// export class SetSelectedMemberGUId {
// 	static readonly type = '[Member Lookup Component] Set Current';
// 	constructor(public payload: string) {}
// }
export class SetSelectedMemberGUId {
  static readonly type = '[Member Lookup Component] Set Current';
  constructor(public payload: string) {}
}
