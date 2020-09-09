import { UIStateModel } from './ui.model';

export class GetTestNamesVisibility {
  static readonly type = '[UI] Get TestNamesVisibility';
  constructor(public payload: UIStateModel) {}
}

export class SetTestNamesVisibility {
  static readonly type = '[UI] update testNamesVisibility';
  constructor(public readonly payload: boolean) {}
}

export class GetSelectedYearPeriod {
  static readonly type = '[UI] Get selectedYearPeriod';
  constructor(public payload: UIStateModel) {}
}

export class SetSelectedYearPeriod {
  static readonly type = '[UI] update selectedYearPeriod';
  constructor(public readonly payload: string) {}
}

export class GetQRComponentsEditable {
  static readonly type = '[UI] Get QRComponentsEditable';
  constructor(public payload: UIStateModel) {}
}

export class SetQRComponentsEditable {
  static readonly type = '[UI] update QRComponentsEditable';
  constructor(public readonly payload: boolean) {}
}
