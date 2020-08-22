import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { Student } from 'src/app/_shared/models/student';
import { StudentDTO } from 'src/app/_shared/models/studentDTO';
import { TruncateDatePipe } from 'src/app/_shared/pipes/truncate-date-pipe';
import { MiscDataService } from 'src/app/_shared/services/misc-data.service';
import { StudentDataService } from 'src/app/_shared/services/student-data.service';
import { UrlService } from 'src/app/_shared/services/url.service';


@Component({
  selector: 'app-admins-student-profile',
  templateUrl: './admins-student.component.html',
  styleUrls: ['./admins-student.component.css'],
})
export class AdminsStudentComponent implements OnInit {
  myForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;

  studentStatuses: SELECTITEM[];
  languageStatuses: SELECTITEM[];
  schoolTypes: SELECTITEM[];
  joinedYears: SELECTITEM[];
  gradYears: SELECTITEM[];
  gradMonths: SELECTITEM[];
  credentialYears: SELECTITEM[];
  credentialMonths: SELECTITEM[];
  genders: SELECTITEM[];


  // mentors: SELECTITEM[];
  mentors$: Observable<SELECTITEM[]> = this.miscData.mentors$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        console.log('CAUGHT ERROR IN Component ' + err);
        return EMPTY;
      })
    );

  // prepas: SELECTITEM[];
  prepas$: Observable<SELECTITEM[]>
    = this.miscData.prepas$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          console.log('CAUGHT ERROR IN Component ' + err);
          return EMPTY;
        })
      );

  // universities: SELECTITEM[];
  universities$: Observable<SELECTITEM[]>
    = this.miscData.universities$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          console.log('CAUGHT ERROR IN Component ' + err);
          return EMPTY;
        })
      );

  // universityGradeMonths: SELECTITEM[];
  universityGradeMonths$: Observable<SELECTITEM[]>
    = this.miscData.universityGradeMonths$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          console.log('CAUGHT ERROR IN Component ' + err);
          return EMPTY;
        })
      );

  // sponsorGroups: SELECTITEM[];
  sponsorGroups$: Observable<SELECTITEM[]>
    = this.miscData.sponsorGroups$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          console.log('CAUGHT ERROR IN Component ' + err);
          return EMPTY;
        })
      );


  errorMessage: string;
  successMessage: string;
  // firstNames: string;
  // lastNames: string;
  student: Student;
  studentDTO: StudentDTO;
  photoPathName: string;
  studentIdParam: number;
  studentGUIdParam: string;
  sponsorGroupIdParam: number;
  emojiPathname: string;
  readonly smileys: string[] = constants.smileys;
  showEditLink = false;
  webPrefix: string;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public urlService: UrlService,
    public studentData: StudentDataService,
    public miscData: MiscDataService,
    public formBuilder: FormBuilder,
    public location: Location
  ) {
    console.log('hi from AdminsStudent constructor');
    this.webPrefix = urlService.getClientUrl();

    this.languageStatuses = constants.languageStatuses;
    this.studentStatuses = constants.studentStatuses;
    this.schoolTypes = constants.schoolTypes;
    this.joinedYears = constants.joinedYears;
    this.gradYears = constants.gradYears;
    this.gradMonths = constants.months;
    this.credentialYears = constants.gradYears;
    this.credentialMonths = constants.months;
    this.genders = constants.genders;

    // this.fetchMentors();
    // this.fetchMentorObservable();

    // this.fetchPrepas();
    // this.fetchUniversities();
    // this.fetchSponsorGroups();

    this.myForm = formBuilder.group({
      studentId: [{ value: '', }],
      // firstNames: ['',
      //   Validators.compose([Validators.required, Validators.maxLength(30)])],
      // lastNames: [{ value: '' },
      // Validators.compose([Validators.required, Validators.email, Validators.maxLength(30)])],
      // email: [{ value: '' },
      // Validators.compose([Validators.required, Validators.maxLength(50)])],
      cellPhone: [{ value: '' },
      Validators.compose([Validators.minLength(7), Validators.maxLength(13)])],
      homePhone: [{ value: '' },
      Validators.compose([Validators.minLength(7), Validators.maxLength(13)])],
      nickName: [{ value: '' }, Validators.maxLength(20)],
      photoUrl: [{ value: '' }, Validators.maxLength(255)],
      gender: ['',
        Validators.compose([Validators.required, Validators.maxLength(1)])],
      educationalLevelId: [{ value: '' }],
      emergencyContactPhone: [{ value: '' },
      Validators.compose([Validators.minLength(7), Validators.maxLength(13)])],
      emergencyContactName: [{ value: '' }],
      major: [{ value: '' }],
      englishSkillLevelId: [{ value: '' }],
      statusId: [{ value: '' }],
      yearJoinedJa: [{ value: '', }],
      joinedFromId: [{ value: '' }],
      prepaId: [{ value: '' }],
      universityId: [{ value: '' }],
      universityGradeMonthId: [{ value: '' }],
      gradYear: [{ value: '' }],
      gradMonthNum: [{ value: '' }],
      credentialYear: [{ value: '' }],
      credentialMonthNum: [{ value: '' }],
      probationStartDate: [{ value: '' },
      Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])],
      probationEndDate: [{ value: '' },
      Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])],

      mentorAssignedDate: [{ value: '' },
      Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])],
      mentoringEndDate: [{ value: '' },
      Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])],

      curp: [{ value: '' }],
      rfc: [{ value: '' }],
      bankAccount: [{ value: '' }],
      sponsorGroupId: [{ value: '' }],
      mentorGUId: [{ value: '' }],
      studentGUId: [{ value: '' }]
    });
    this.myForm.disable();
    console.log(this.myForm.controls);
    // this.myForm.controls.probationStartDate.valueChanges.subscribe(() => {
    //   console.log(this.myForm.controls.probationStartDate.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
    // });

    this.student = new Student();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('admins Student ngOnInit');
    this.studentGUIdParam = this.currRoute.snapshot.params['guid'];
    console.log('data service with studentGUIdParam: ' + this.studentGUIdParam);
    this.fetchStudentDTOData();
  }

  // need to get data from associated member record first
  fetchStudentDTOData() {
    this.isLoading = true;
    this.studentData.getStudentDTOViaGUID(this.studentGUIdParam)
      .subscribe(
        data => {
          this.studentDTO = data;
          console.log('#######studentDTO: MemberRecordGUId ' + this.studentDTO.memberRecordGUId);
          console.log('#######studentDTO: mentorGUId ' + this.studentDTO.mentorGUId);
          console.log('#######studentDTO: mentorId ' + this.studentDTO.mentorId);
          this.studentDTO = this.getNumericStatus(this.studentDTO);
        },
        err => { this.errorMessage = err; },
        () => {
          console.log('studentDTO data loaded');
          console.log(JSON.stringify(this.studentDTO));
          // need to load additional fields that are not in DTO
          this.fetchStudentData();
          this.isLoading = false;
        }
      );
  }

  // called after fetchStudentDTOData  (contains additional fields needed)
  fetchStudentData() {
    this.isLoading = true;
    this.studentData.getStudentViaGUID(this.studentGUIdParam)
      .subscribe(
        data => {
          this.student = data;
          this.photoPathName = this.webPrefix + '/assets/images/StudentPhotos/' + this.student.yearJoinedJa;
          // this.photoPathName = '../../../../assets/images/StudentPhotos/' + this.student.yearJoinedJa;
          this.photoPathName = this.photoPathName + '/' + this.student.photoUrl;
          console.log('photoPathName is ' + this.photoPathName);
          console.log(this.student);
          this.emojiPathname = this.smileys[this.studentDTO.studentSnapshotStatus + 1];
          console.log('emoji is ' + this.emojiPathname);
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('getStudent is done now set timeout for scroll');
          this.setFormValues(this.student);
          console.log('#######student: mentorGUId ' + this.student.mentorGUId);

          setTimeout(() => {
            this.scrollIntoView();
          }, 0);
          this.isLoading = false;
        });

    this.myForm.valueChanges.subscribe(
      (form: any) => {
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
      }
    );

    this.myForm.controls.sponsorGroupId.valueChanges.subscribe(newId => {
      console.log('have new sponsorGroupId: ' + newId);
      this.sponsorGroupIdParam = newId;
    });

  }


  setFormValues(student: Student) {
    console.log('setFormValues');
    console.log('>>>>>>>>>>>mentorGUId: ' + student.mentorGUId);
    this.myForm.setValue({
      studentId: student.studentId,
      // firstNames: student.firstNames,
      // lastNames: student.lastNames,
      // email: student.email,
      gender: student.gender,
      cellPhone: student.cellPhone,
      homePhone: student.homePhone,
      nickName: student.nickName,
      photoUrl: student.photoUrl,
      educationalLevelId: student.educationalLevelId,
      emergencyContactPhone: student.emergencyContactPhone,
      emergencyContactName: student.emergencyContactName,
      major: student.major,
      englishSkillLevelId: student.englishSkillLevelId,
      statusId: student.statusId,
      yearJoinedJa: student.yearJoinedJa,
      joinedFromId: student.joinedFromId,
      prepaId: student.prepaId,
      universityId: student.universityId,
      universityGradeMonthId: student.universityId,
      gradYear: student.gradYear,
      gradMonthNum: student.gradMonthNum,
      credentialYear: student.credentialYear,
      credentialMonthNum: student.credentialMonthNum,
      probationStartDate: new TruncateDatePipe().transform('' + student.probationStartDate),
      probationEndDate: new TruncateDatePipe().transform('' + student.probationEndDate),
      mentorAssignedDate: new TruncateDatePipe().transform('' + student.mentorAssignedDate),
      mentoringEndDate: new TruncateDatePipe().transform('' + student.mentoringEndDate),

      curp: student.curp,
      rfc: student.rfc,
      bankAccount: student.bankAccount,
      sponsorGroupId: student.sponsorGroupId,
      // mentorGUId: '46D33F1B-BA9E-4C47-800E-16E2AB0E095C', //
      mentorGUId: student.mentorGUId.toUpperCase(),
      // mentorGUId: mentorId, // student.mentorId,
      studentGUId: student.studentGUId

    });
    console.log('++++++++++++++++universityGradeMonthId = ' + this.myForm.controls.universityGradeMonthId.value);

  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.student = { ...this.student, ...this.myForm.value };
  }

  saveMyForm(): boolean {
    console.log('saving admin student ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.studentData.updateStudent(this.student)
      .subscribe(
        (student) => {
          // console.log('subscribe result in updateStudent');
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          // this.successMessage = 'Changes were saved successfully.';
          this.submitted = true;
          this.isLoading = false;
          window.scrollTo(0, 0);
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
          }, 3000);
        },
        (error) => {
          this.errorMessage = <any>error;
          this.isLoading = false;
        }
      );
    // prevent default action of reload
    return false;
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  backToStudentsList() {
    this.router.navigate(['/admins/students']);
  }

  mentorReportsReview() {
    // const guid = this.currRoute.snapshot.params['guid'];
    this.router.navigate(['/admins/students/student/mentorReports/', { mentorId: this.studentDTO.mentorId, mentorGUId: this.studentDTO.mentorGUId, studentGUId: this.studentDTO.studentGUId, studentName: this.student.firstNames + ' ' + this.student.lastNames }]);
  }

  // createProxyMentorReport() {
  //   // const guid = this.currRoute.snapshot.params['guid'];
  //   // this.router.navigate(['/admins/mr-proxy-add/' + this.studentGUIdParam + '/' + this.student.firstNames + ' ' + this.student.lastNames]);

  //   console.log('#######studentDTO: mentorGUId ' + this.studentDTO.mentorGUId);
  //   console.log('#######studentDTO: mentorId ' + this.studentDTO.mentorId);
  //   const link = ['/mentors/monthly-reports-add', { mentorId: this.studentDTO.mentorId, mentorGUId: this.studentDTO.mentorGUId, studentGUId: this.studentDTO.studentGUId }];
  //   console.log('navigating to ' + JSON.stringify(link));
  //   this.router.navigate(link);

  // }


  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted

    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  gotoMemberRecord() {
    const link = ['admins/members/member', { guid: this.studentDTO.memberRecordGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);

  }

  gotoGradeHistory() {
    const id = this.currRoute.snapshot.params['id'];
    const link = ['/admins/students/grade-history/' + id + '/'];
    this.router.navigate(link);
  }

  gotoMentor(guid: string) {
    const link = ['admins/members/member', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  setReadOnly() {
    console.log('toggle readOnly');
    if (this.myForm.enabled) {
      this.myForm.disable();
      this.showEditLink = false;
    } else {
      this.myForm.enable();
      this.showEditLink = true;
    }
    // needs to always be read only
    this.myForm.controls.universityGradeMonthId.disable();
  }
  onDateSelect() {
    alert('data selected');
  }

  getNumericStatus(studentDTO: StudentDTO): StudentDTO {

    studentDTO.numericTimelyMentorMeetingStatus = 0;
    if (studentDTO.timelyMentorMeetingStatus === 'red') {
      studentDTO.numericTimelyMentorMeetingStatus = 1;
    } else if (studentDTO.timelyMentorMeetingStatus === 'yellow') {
      studentDTO.numericTimelyMentorMeetingStatus = 2;
    } else if (studentDTO.timelyMentorMeetingStatus === 'green') {
      studentDTO.numericTimelyMentorMeetingStatus = 3;
    }

    studentDTO.numericTimelyMentorReportStatus = 0;
    if (studentDTO.timelyMentorReportStatus === 'red') {
      studentDTO.numericTimelyMentorReportStatus = 1;
    } else if (studentDTO.timelyMentorReportStatus === 'yellow') {
      studentDTO.numericTimelyMentorReportStatus = 2;
    } else if (studentDTO.timelyMentorReportStatus === 'green') {
      studentDTO.numericTimelyMentorReportStatus = 3;
    }


    studentDTO.numericGradeRptStatus = 0;
    if (studentDTO.gradeRptStatus === 'red') {
      studentDTO.numericGradeRptStatus = 1;
    } else if (studentDTO.gradeRptStatus === 'yellow') {
      studentDTO.numericGradeRptStatus = 2;
    } else if (studentDTO.gradeRptStatus === 'green') {
      studentDTO.numericGradeRptStatus = 3;
    }

    studentDTO.numericGPAStatus = 0;
    if (studentDTO.gpaStatus === 'red') {
      studentDTO.numericGPAStatus = 1;
    } else if (studentDTO.gpaStatus === 'yellow') {
      studentDTO.numericGPAStatus = 2;
    } else if (studentDTO.gpaStatus === 'green') {
      studentDTO.numericGPAStatus = 3;
    }

    studentDTO.joinedFrom = 'N/A';
    if (studentDTO.joinedFromId === 2056) {
      studentDTO.joinedFrom = 'Prepa';
    } else if (studentDTO.joinedFromId === 2057) {
      studentDTO.joinedFrom = 'Univ';
    }

    return studentDTO;
  }


}
