import { UIStateModel } from './ui.model';

export class GetTestNamesVisibility {
  static readonly type = '[UI] Get TestNamesVisibility';
  constructor(public payload: UIStateModel) {}
}
export class SetTestNamesVisibility {
  static readonly type = '[UI] update testNamesVisibility';
  constructor(public readonly payload: boolean) {}
}
///
export class GetQRComponentsEditable {
  static readonly type = '[UI] Get QRComponentsEditable';
  constructor(public payload: UIStateModel) {}
}
export class SetQRComponentsEditable {
  static readonly type = '[UI] update QRComponentsEditable';
  constructor(public readonly payload: boolean) {}
}
///
export class GetSelectedQRPeriod {
  static readonly type = '[UI] Get selectedQRPeriod';
  constructor(public payload: UIStateModel) {}
}
export class SetSelectedQRPeriod {
  static readonly type = '[UI] update selectedQRPeriod';
  constructor(public readonly payload: string) {}
}
///
export class GetSelectedGradesProcessingPeriodID {
  static readonly type = '[UI] Get selectedGradesProcessingPeriodID';
  constructor(public payload: UIStateModel) {}
}
export class SetSelectedGradesProcessingPeriodID {
  static readonly type = '[UI] update selectedGradesProcessingPeriodID';
  constructor(public readonly payload: string) {}
}
export class GetSelectedInscriptionsProcessingPeriodID {
  static readonly type = '[UI] Get selectedInscriptionsProcessingPeriodID';
  constructor(public payload: UIStateModel) {}
}

export class SetSelectedInscriptionsProcessingPeriodID {
  static readonly type = '[UI] update selectedInscriptionsProcessingPeriodID';
  constructor(public readonly payload: string) {}
}
///
export class GetSelectedYearJoined {
  static readonly type = '[UI] Get selectedYearJoined';
  constructor(public payload: UIStateModel) {}
}
export class SetSelectedYearJoined {
  static readonly type = '[UI] update selectedYearJoined';
  constructor(public readonly payload: string) {}
}
///
export class SetSelectedGradYear {
  static readonly type = '[UI] update selectedGradYear';
  constructor(public readonly payload: string) {}
}
export class GetSelectedGradYear {
  static readonly type = '[UI] Get selectedGradYear';
  constructor(public payload: UIStateModel) {}
}
///
export class GetSelectedStudentStatus {
  static readonly type = '[UI] Get selectedStudentStatus';
  constructor(public payload: UIStateModel) {}
}
export class SetSelectedStudentStatus {
  static readonly type = '[UI] update selectedStudentStatus';
  constructor(public readonly payload: string) {}
}
///
export class GetSelectedFilterMode {
  static readonly type = '[UI] Get selectedFilterMode';
  constructor(public payload: UIStateModel) {}
}
export class SetSelectedFilterMode {
  static readonly type = '[UI] update selectedFilterMode';
  constructor(public readonly payload: string) {}
}
