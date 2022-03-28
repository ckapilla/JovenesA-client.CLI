import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetQRComponentsEditable,
  SetSelectedFilterMode, SetSelectedGadesProcessingPeriod, SetSelectedGradYear, SetSelectedQRPeriod, SetSelectedStudentStatus,
  SetSelectedYearJoined, SetTestNamesVisibility
} from './ui.action';
import { UIStateModel } from './ui.model';

@State<UIStateModel>({
  name: 'ui',
  defaults: {
    testNamesVisibility: false,
    qrComponentsEditable: false,

    selectedQRPeriod: '', // initialize ConstantsService.generateQRPeriods
    selectedGadesProcessingPeriod: '108', // { value: '104', label: '2021-07-01 : 2021-11-30' }

    selectedFilterMode: '998',
    selectedStudentStatus: '0',
    selectedYearJoined: '0',
    selectedGradYear: '0',
    // ssrEditDateRange: '2021-12-26|2022-01-07'
    ssrEditDateRange: '2022-03-24|2022-06-07'
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
  static getSSREditDateRange(state: UIStateModel) {
    return state.ssrEditDateRange;
  }

  @Selector()
  static getSelectedQRPeriod(state: UIStateModel): string {
    return state.selectedQRPeriod;
  }

  @Action(SetSelectedQRPeriod)
  setSelectedQRPeriod(ctx: StateContext<UIStateModel>, { payload }: SetSelectedQRPeriod) {
    const selectedQRPeriod = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedQRPeriod
    });
  }

  @Selector()
  static getSelectedGadesProcessingPeriod(state: UIStateModel) {
    return state.selectedGadesProcessingPeriod;
  }

  @Action(SetSelectedGadesProcessingPeriod)
  setSelectedGadesProcessingPeriod(ctx: StateContext<UIStateModel>, { payload }: SetSelectedGadesProcessingPeriod) {
    const selectedGadesProcessingPeriod = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedGadesProcessingPeriod
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
