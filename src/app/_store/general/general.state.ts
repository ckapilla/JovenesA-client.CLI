import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { GeneralStateModel } from './general.model';

@State<GeneralStateModel>({
  name: 'general',
  // defaults: {

  // }
})
@Injectable()
export class GeneralState {
  constructor() {}




}
