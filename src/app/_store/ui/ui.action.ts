import { UIStateModel } from './ui.model';

export class GetTestNamesVisibility {
  static readonly type = '[UI] Get TestNamesVisibility';
  constructor(public payload: UIStateModel) {}
}

export class SetTestNamesVisibility {
  static readonly type = '[UI] update testNamesVisibility';
  constructor(public readonly payload: boolean) {}
}
