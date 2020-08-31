// import { StudentState } from './student/student.state';
import { SelectedMemberService } from './selectedMember/selected-member.service';
import { SelectedStudent } from './selectedStudent/selected-student.service';
import { TestNamesVisibilityService } from './testNamesVisibility/test-names-visibility.service';

// Still allow other modules to take what they need, eg action & selectors
export * from './selectedMember/selected-member.service';
export * from './selectedStudent/selected-student.service';
export * from './testNamesVisibility/test-names-visibility.service';

export const JovenesAStore = [
	// StudentState,
	SelectedStudent,
	SelectedMemberService,
	TestNamesVisibilityService
];

console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
console.log(JSON.stringify(JovenesAStore));
