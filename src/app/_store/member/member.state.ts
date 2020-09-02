import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { MemberDataService } from 'src/app/_shared/data/member-data.service';
import { GetMembers, SetSelectedMemberGUId } from './member.action';
import { MemberStateModel } from './member.model';

@State<MemberStateModel>({
  name: 'member',
  defaults: {
    members: [],
    selectedMemberGUId: '0000'
  }
})
@Injectable()
export class MemberState {
  constructor(private memberDataService: MemberDataService) {}

  @Selector()
  static getMembers(state: MemberStateModel) {
    return state.members;
  }

  @Selector()
  static getSelectedMemberGUId(state: MemberStateModel) {
    return state.selectedMemberGUId;
  }

  @Action(GetMembers)
  getMembers({ getState, setState }: StateContext<MemberStateModel>) {
    return this.memberDataService.getCurrentMemberMiniDTOs('*').pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          members: result
        });
      })
    );
  }

  @Action(SetSelectedMemberGUId)
  setSelectedMemberGUId(ctx: StateContext<MemberStateModel>, { payload }: SetSelectedMemberGUId) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedMemberGUId: payload
    });
  }
}
