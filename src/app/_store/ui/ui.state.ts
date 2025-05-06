import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetQRComponentsEditable,
  SetSelectedFilterMode,
  SetSelectedGradesPeriodId,
  SetSelectedGradYear,
  SetSelectedInscriptionsPeriodId,
  SetSelectedPCSMonthNum,
  SetSelectedPCSYear,
  SetSelectedQRPeriod, SetSelectedStudentStatus,
  SetSelectedYearJoined, SetTestNamesVisibility
} from './ui.action';
import { UIStateModel } from './ui.model';

@State<UIStateModel>({
  name: 'ui',
  defaults: {
    testNamesVisibility: false,
    qrComponentsEditable: false,

    selectedQRPeriod: '', // initialize ConstantsService.generateQRPeriods
    selectedGradesPeriodId: '123', // need to initialize this from ConstantsService
    selectedInscriptionsPeriodId: '124', // need to initialize this from ConstantsService
    selectedPCSYear: '2025',
    selectedPCSMonthNum: '0',
    selectedFilterMode: '998',
    selectedStudentStatus: '0',
    selectedYearJoined: '0',
    selectedGradYear: '2025'
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
  static getSelectedPCSYear(state: UIStateModel): string {
    return state.selectedPCSYear;
  }

  @Action(SetSelectedPCSYear)
  setSelectedPCSYear(ctx: StateContext<UIStateModel>, { payload }: SetSelectedPCSYear) {
    const selectedPCSYear = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedPCSYear
    });
  }


  @Selector()
  static getSelectedPCSMonthNum(state: UIStateModel): string {
    return state.selectedPCSMonthNum;
  }

  @Action(SetSelectedPCSMonthNum)
  setSelectedPCSMonthNum(ctx: StateContext<UIStateModel>, { payload }: SetSelectedPCSMonthNum) {
    const selectedPCSMonthNum = payload;
    console.log('************NGXS: new selectedPCSMonthNum received' + selectedPCSMonthNum);
    const state = ctx.getState();
    console.log('B4 State',JSON.stringify(state));
    ctx.patchState({
      // Copilot suggestion to not update the whole state...state,
      selectedPCSMonthNum
    });
    // this is wrong: console.log('AFTER State', JSON.stringify(state));
    const updatedState = ctx.getState();
    console.log('AFTER with updatedState:', JSON.stringify(updatedState));
  }

  @Action(SetSelectedGradesPeriodId)
  setSelectedGradesPeriodId(ctx: StateContext<UIStateModel>, { payload }: SetSelectedGradesPeriodId) {
    const selectedGradesPeriodId = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedGradesPeriodId: selectedGradesPeriodId
    });
  }



  @Selector()
  static etSelectedGradesPeriodId(state: UIStateModel) {
    return state.selectedGradesPeriodId;
  }

  @Action(SetSelectedInscriptionsPeriodId)
  setSelectedInscriptionsPeriodId(ctx: StateContext<UIStateModel>, { payload }: SetSelectedInscriptionsPeriodId) {
    const selectedInscriptionsPeriodId = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedInscriptionsPeriodId: selectedInscriptionsPeriodId
    });
  }

  @Selector()
  static getSelectedInscriptionsPeriodId(state: UIStateModel) {
    return state.selectedInscriptionsPeriodId;
  }

  @Selector()
  static getSelectedGradesPeriodId(state: UIStateModel) {
    return state.selectedGradesPeriodId;
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
