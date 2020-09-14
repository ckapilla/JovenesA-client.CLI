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
export class GetSelectedYearPeriod {
  static readonly type = '[UI] Get selectedYearPeriod';
  constructor(public payload: UIStateModel) {}
}
export class SetSelectedYearPeriod {
  static readonly type = '[UI] update selectedYearPeriod';
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
export class GetSelectedActiveStatus {
  static readonly type = '[UI] Get selectedActiveStatus';
  constructor(public payload: UIStateModel) {}
}
export class SetSelectedActiveStatus {
  static readonly type = '[UI] update selectedActiveStatus';
  constructor(public readonly payload: string) {}
}
