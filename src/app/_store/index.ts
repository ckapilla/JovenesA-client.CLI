// import { StudentState } from './student/student.state';
import { SelectedMemberService } from './selectedMember/selected-member.service';
import { SelectedStudent } from './selectedStudent/selected-student.service';
import { TestNamesVisibilityService } from './testNamesVisibility/test-names-visibility.service';

// Still allow other modules to take what they need, eg action & selectors
export { SelectedMemberService } from './selectedMember/selected-member.service';
export { SelectedStudent } from './selectedStudent/selected-student.service';
export { TestNamesVisibilityService } from './testNamesVisibility/test-names-visibility.service';

export const JovenesAStore = [
  // StudentState,
  SelectedStudent,
  SelectedMemberService,
  TestNamesVisibilityService
];
