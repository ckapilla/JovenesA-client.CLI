import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { constants } from '../../_shared/constants/constants';
import {
  SetQRComponentsEditable,
  SetSelectedFilterMode,
  SetSelectedGradYear, SetselectedQRPeriod, SetSelectedStudentStatus,
  SetSelectedYearJoined, SetTestNamesVisibility
} from './ui.action';
import { UIStateModel } from './ui.model';

@State<UIStateModel>({
  name: 'ui',
  defaults: {
    testNamesVisibility: false,
    qrComponentsEditable: false,
    selectedQRPeriod: '', // initialize ConstantsService.generateQRPeriods
    selectedGradesGivenDate: constants.currentGradePeriodStartDate,

    selectedFilterMode: '998',
    selectedStudentStatus: '0',
    selectedYearJoined: '0',
    selectedGradYear: '0'
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

  @Selector()
  static getselectedQRPeriod(state: UIStateModel) {
    return state.selectedQRPeriod;
  }

  @Action(SetselectedQRPeriod)
  setselectedQRPeriod(ctx: StateContext<UIStateModel>, { payload }: SetselectedQRPeriod) {
    const selectedQRPeriod = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedQRPeriod
    });
  }

  @Selector()
  static getSelectedYearJoined(state: UIStateModel) {
    return state.selectedYearJoined;
  }

  @Action(SetSelectedYearJoined)
  setSelectedYearJoined(ctx: StateContext<UIStateModel>, { payload }: SetSelectedYearJoined) {
    const selectedYearJoined = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedYearJoined
    });
  }

  @Selector()
  static getSelectedGradYear(state: UIStateModel) {
    return state.selectedGradYear;
  }

  @Action(SetSelectedGradYear)
  setSelectedGradYear(ctx: StateContext<UIStateModel>, { payload }: SetSelectedGradYear) {
    const selectedGradYear = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedGradYear
    });
  }

  @Selector()
  static getSelectedStudentStatus(state: UIStateModel) {
    return state.selectedStudentStatus;
  }

  @Action(SetSelectedStudentStatus)
  setSelectedStudentStatus(ctx: StateContext<UIStateModel>, { payload }: SetSelectedStudentStatus) {
    const selectedStudentStatus = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedStudentStatus
    });
  }

  @Selector()
  static getSelectedFilterMode(state: UIStateModel) {
    return state.selectedFilterMode;
  }

  @Action(SetSelectedFilterMode)
  setSelectedFilterMode(ctx: StateContext<UIStateModel>, { payload }: SetSelectedFilterMode) {
    const selectedFilterMode = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedFilterMode
    });
  }
}
