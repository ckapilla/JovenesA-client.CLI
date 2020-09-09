import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetQRComponentsEditable, SetSelectedYearPeriod, SetTestNamesVisibility } from './ui.action';
import { UIStateModel } from './ui.model';

@State<UIStateModel>({
  name: 'ui',
  defaults: {
    testNamesVisibility: false,
    selectedYearPeriod: '2020-2',
    qrComponentsEditable: false
  }
})
@Injectable()
export class UIState {
  constructor() {}

  @Selector()
  static getTestNamesVisibility(state: UIStateModel) {
    return state.testNamesVisibility;
  }

  @Action(SetTestNamesVisibility)
  setTestNamesVisibility(ctx: StateContext<UIStateModel>, { payload }: SetTestNamesVisibility) {
    const testNamesVisibility = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      testNamesVisibility
    });
  }

  @Selector()
  static getSelectedYearPeriod(state: UIStateModel) {
    return state.selectedYearPeriod;
  }

  @Action(SetSelectedYearPeriod)
  setSelectedYearPeriod(ctx: StateContext<UIStateModel>, { payload }: SetSelectedYearPeriod) {
    const selectedYearPeriod = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedYearPeriod
    });
  }

  @Selector()
  static getQRComponentsEditable(state: UIStateModel) {
    return state.qrComponentsEditable;
  }

  @Action(SetQRComponentsEditable)
  setQRComponentsEditable(ctx: StateContext<UIStateModel>, { payload }: SetQRComponentsEditable) {
    const qrComponentsEditable = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      qrComponentsEditable
    });
  }
}
