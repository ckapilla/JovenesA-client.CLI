import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { GetStudents, SetSelectedStudentGUId } from './student.action';
import { StudentStateModel } from './student.model';

@State<StudentStateModel>({
  name: 'student',
  defaults: {
    students: [],
    selectedStudentGUId: '0000'
  }
})
@Injectable()
export class StudentState {
  constructor(private studentDataService: StudentDataService) {}

  @Selector()
  static getStudents(state: StudentStateModel) {
    return state.students;
  }

  @Selector()
  static getSelectedStudentGUId(state: StudentStateModel) {
    return state.selectedStudentGUId;
  }

  @Action(GetStudents)
  getStudents({ getState, setState }: StateContext<StudentStateModel>) {
    return this.studentDataService.getCurrentStudentMiniDTOs('*').pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          students: result
        });
      })
    );
  }

  @Action(SetSelectedStudentGUId)
  setSelectedStudent(ctx: StateContext<StudentStateModel>, { payload }: SetSelectedStudentGUId) {
    const selectedStudentGUId = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedStudentGUId
    });
  }
}
