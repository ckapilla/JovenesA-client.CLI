import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { GetStudents, SetPhotoPathname, SetSelectedStudentGUId, SetSelectedStudentIdentifiers, SetSelectedStudentMentorGUId } from './student.action';
import { StudentStateModel } from './student.model';

@State<StudentStateModel>({
  name: 'student',
  defaults: {
    students: [],
    selectedStudentGUId: '0000',
    selectedStudentName: '',
    photoPathname: '',
    selectedStudentMentorGUId: ''
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

  @Selector()
  static getSelectedStudentName(state: StudentStateModel) {
    return state.selectedStudentName;
  }

  @Selector()
  static getSelectedStudentMentorGUId(state: StudentStateModel) {
    return state.selectedStudentMentorGUId;
  }

  @Selector()
  static getPhotoPathname(state: StudentStateModel) {
    return state.photoPathname;
  }

  @Action(GetStudents)
  getStudents({ getState, setState }: StateContext<StudentStateModel>) {
    return this.studentDataService.getCurrentStudentMiniDTOs('*', true).pipe(
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

  @Action(SetSelectedStudentMentorGUId)
  setSelectedStudentMentorGUId(ctx: StateContext<StudentStateModel>, { payload }: SetSelectedStudentMentorGUId) {
    const selectedStudentMentorGUId = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedStudentMentorGUId
    });
  }


  @Action(SetSelectedStudentIdentifiers)
  setSelectedStudentIdentifiers(ctx: StateContext<StudentStateModel>, { payload }: SetSelectedStudentIdentifiers) {
    const selectedStudentName = payload.studentName;
    const selectedStudentGUId = payload.studentGUId;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedStudentGUId,
      selectedStudentName
    });
  }

  @Action(SetPhotoPathname)
  setPhotoPathname(ctx: StateContext<StudentStateModel>, { payload }: SetPhotoPathname) {
    const photoPathname = payload;
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      photoPathname
    });
  }
}
