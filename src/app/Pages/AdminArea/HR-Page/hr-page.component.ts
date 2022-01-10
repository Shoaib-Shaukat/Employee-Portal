import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/API/api.service';
import { GvarService } from 'src/app/Services/Globel/gvar.service';
import Swal from 'sweetalert2';
import { feedBackStatementDetailResponse, feedBackStatementResponseModel, feedBackStatementResponseModelNew } from '../Feed-Back/FeedBack.Model';
import { statementResponseModel } from '../Statements/Statements.Model';
import { empModel, empResponse, empSurveyModel, SrveyDetailResponse, statementRequestModel, otherFeedBackModel } from './EmpForm.Model';

@Component({
  selector: 'app-hr-page',
  templateUrl: './hr-page.component.html',
  styleUrls: ['./hr-page.component.css']
})
export class HRPageComponent implements OnInit {
  SecondLastStatement: boolean = false;
  LastStatement: boolean = false;
  JobFeedBackStatement: boolean = false;
  hardCodeArrOne: { id: number, name: string, optionChecked: boolean }[] = [
    { "id": 0, "name": "Yes", optionChecked: false },
    { "id": 1, "name": "No", optionChecked: false },
    { "id": 2, "name": "MayBe", optionChecked: false },
  ];
  hardCodeArrTwo: { id: number, name: string, optionChecked: boolean }[] = [
    { "id": 0, "name": "Yes", optionChecked: false },
    { "id": 1, "name": "No", optionChecked: false },
    { "id": 2, "name": "MayBe", optionChecked: false }
  ];
  otherFeedBackModel: otherFeedBackModel[];
  feedBackStatementResponseModelNew: feedBackStatementResponseModelNew[];
  feedBackStatementResponseModel: feedBackStatementResponseModel[];
  submitted: boolean = false;
  empSurveyModel: empSurveyModel;
  validForm: boolean = false;
  statementResponseModel: statementResponseModel[];
  EmployeeCode: any;
  empResponse: empResponse;
  EmployeeForm: FormGroup;
  empModel: empModel;
  currentDate: any;
  SrveyDetailResponse: SrveyDetailResponse[];
  feedBackStatementDetailResponse: feedBackStatementDetailResponse[];
  hasRole: boolean = false;
  constructor(private API: ApiService, public GV: GvarService, private router: Router) {
    this.empResponse = new empResponse();
    this.empModel = new empModel();
    this.statementResponseModel = [];
    this.SrveyDetailResponse = [];
    this.feedBackStatementDetailResponse = [];
    this.empSurveyModel = new empSurveyModel();
    this.feedBackStatementResponseModel = [];
    this.feedBackStatementResponseModelNew = [];
    this.otherFeedBackModel = [];
  }

  ngOnInit(): void {
    this.InitializeForm();
    this.getSurveyDetail();
    this.getStatments();
    this.getFeedBackStatements();
    this.getFeedBackStatementsDetail();
    this.currentDate = this.formatDate(new Date());
    if (localStorage.getItem('hasRole') == 'true') {
      this.hasRole = true;
    }
    else {
      this.getEmployeeInfo();
    }
  }

  get f() { return this.EmployeeForm.controls; }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  InitializeForm(): any {
    this.EmployeeForm = new FormGroup({
      EmployeeRefNo: new FormControl(""),
      EmployeeName: new FormControl(""),
      FatherHusbandName: new FormControl(""),
      BirthDate: new FormControl(""),
      Sex: new FormControl(""),
      MobileNumber: new FormControl(""),
      Telephone: new FormControl(""),
      PersonalEmail: new FormControl(""),
      Address: new FormControl(""),
      PermanentAddress: new FormControl(""),
      CountryTitle: new FormControl(""),
      DepartmentID: new FormControl(""),
      EmployeeGradeTitle: new FormControl(""),
      ApproverName: new FormControl(""),
      DepartmentRefNo: new FormControl(""),
      DepartmentTitle: new FormControl(""),
      DesignationID: new FormControl(""),
      DesignationRefNo: new FormControl(""),
      DesignationTitle: new FormControl(""),
      BranchID: new FormControl(""),
      BranchRefNo: new FormControl(""),
      BranchTitle: new FormControl(""),
      LeavingReasonID: new FormControl(""),
      LeavingReasonRefNo: new FormControl(""),
      LeavingReasonTitle: new FormControl(""),
      AppointmentDate: new FormControl(""),
      JoiningDate: new FormControl(""),
      ResignationDate: new FormControl(""),
      LeavingDate: new FormControl(""),
      HasLeaved: new FormControl(""),
      ConfirmationDate: new FormControl(""),
      HasConfirmed: new FormControl(""),
      ServicePeriod: new FormControl(""),
      ServicePeriodInYear: new FormControl(""),
      ServicePeriodInMonth: new FormControl(""),
      IsContractual: new FormControl(""),
      Grade: new FormControl(""),
      EffectiveDate: new FormControl(""),
      firstTextArea: new FormControl("", [Validators.required]),
      secondTextArea: new FormControl("", [Validators.required]),
    });
  }

  getSurveyDetail() {
    this.API.getdata('/Admin/getSurveytDetail?surveyID=1').subscribe(
      data => {
        if (data != null) {
          this.SrveyDetailResponse = data;
          this.SrveyDetailResponse = this.SrveyDetailResponse.sort((a, b) => (a.dissequence > b.dissequence) ? 1 : -1);
        }
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  getFeedBackStatementsDetail() {
    this.API.getdata('/admin/getfeedbackStatementDetail?surveyID=1').subscribe(
      data => {
        if (data != null) {
          this.feedBackStatementResponseModelNew = data;
        }
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  getStatments() {
    this.API.getdata('/admin/getStatements?surveyID=1').subscribe(
      data => {
        if (data != null) {
          this.statementResponseModel = data;
          this.statementResponseModel = this.statementResponseModel.sort((a, b) => (a.dissequence > b.dissequence) ? 1 : -1);
        }
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  resetEmpForm() {
    this.empSurveyModel = new empSurveyModel();
    this.empResponse = new empResponse();
    this.empModel = new empModel();
    this.statementResponseModel = [];
    this.SrveyDetailResponse = [];
    this.feedBackStatementDetailResponse = [];
    this.feedBackStatementResponseModel = [];
    this.feedBackStatementResponseModelNew = [];
    this.getSurveyDetail();
    this.getFeedBackStatements();
    this.getStatments();
    this.getFeedBackStatementsDetail();

    if (this.hasRole == true) {
      this.empModel = new empModel();
      this.EmployeeForm.reset();
    }
    this.currentDate = this.formatDate(new Date());

    this.hardCodeArrOne.forEach(x => {
      x.optionChecked = false;
    });
    this.hardCodeArrTwo.forEach(x => {
      x.optionChecked = false;
    });
    this.EmployeeForm.controls.firstTextArea.setValue("");
    this.EmployeeForm.controls.secondTextArea.setValue("");
    this.submitted = false;
    this.LastStatement = false;
    this.SecondLastStatement = false;
    this.JobFeedBackStatement = false;
  }

  getEmployeeInfo() {
    this.resetEmpForm();
    if (this.hasRole == false) {
      this.EmployeeCode = localStorage.getItem('empID');
    }
    if (this.EmployeeCode == "" || this.EmployeeCode == null || this.EmployeeCode == undefined) {
      Swal.fire({
        text: "Enter Employee Code First!",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    this.API.getdata('/admin/GetEmployeeInfoByEmployeeCode?empID=' + this.EmployeeCode).subscribe(
      data => {
        if (data != null) {
          this.empModel = data.empModel;
          if (this.empModel.AppointmentDate != null) {
            this.empModel.AppointmentDate = this.empModel.AppointmentDate.substring(0, this.empModel.AppointmentDate.length - 9);
          }
          if (this.empModel.ConfirmationDate != null) {
            this.empModel.ConfirmationDate = this.empModel.ConfirmationDate.substring(0, this.empModel.ConfirmationDate.length - 9);
          }
          if (this.empModel.LeavingDate != null) {
            this.empModel.LeavingDate = this.empModel.LeavingDate.substring(0, this.empModel.LeavingDate.length - 9);
          }
          if (this.empModel.JoiningDate != null) {
            this.empModel.JoiningDate = this.empModel.JoiningDate.substring(0, this.empModel.JoiningDate.length - 9);
          }
          if (this.empModel.ResignationDate != null) {
            this.empModel.ResignationDate = this.empModel.ResignationDate.substring(0, this.empModel.ResignationDate.length - 9);
          }
          this.EmployeeForm.patchValue(this.empModel);
          this.EmployeeForm.controls.firstTextArea.setValue(null);
          this.EmployeeForm.controls.secondTextArea.setValue(null);
        }
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  submitEmployeeForm() {
    this.submitted = true;
    this.empSurveyModel;
    this.validations();
    if (this.validForm == true) {
      var indexArrOne = this.hardCodeArrOne.findIndex(
        (x) => x.optionChecked == true
      );
      if (indexArrOne != -1) {
        this.SecondLastStatement = false;
      }
      else {
        this.SecondLastStatement = true;
      }
      var indexArrTwo = this.hardCodeArrTwo.findIndex(
        (x) => x.optionChecked == true
      );
      if (indexArrTwo != -1) {
        this.LastStatement = false;
      }
      else {
        this.LastStatement = true;
      }
      if ((this.EmployeeForm.valid) && (this.SecondLastStatement == false) && (this.LastStatement == false)) {
        this.empSurveyModel.employeeName = this.EmployeeForm.controls.EmployeeName.value;
        this.API.PostData('/admin/saveSurvey', this.empSurveyModel).subscribe(c => {
          if (c != null) {
            Swal.fire({
              text: 'Saved Successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }
        },
          error => {
            Swal.fire({
              text: error.error.Message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
    }
  }

  validations() {
    if (this.empModel.EmployeeRefNo == null || this.empModel.EmployeeRefNo == undefined) {
      Swal.fire({
        text: "Search Employee First!",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    const result = [];
    const map = new Map();
    for (const item of this.empSurveyModel.statementRequestModel) {
      if (!map.has(item.statementID)) {
        map.set(item.statementID, true);    // set any value to Map
        result.push({
          id: item.statementID
        });
      }
    }
    if (result.length < this.statementResponseModel.length) {
      Swal.fire({
        text: "Select atleast one option against each Statement",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.empSurveyModel.feedBackStatementDetailRequest.length != this.feedBackStatementResponseModelNew.length) {
      Swal.fire({
        text: "Select one option against each Job Feedback Statement",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      this.JobFeedBackStatement = true;
      return;
    }
    this.JobFeedBackStatement = false;
    // if (this.empSurveyModel.statementOneRequestModel.StatementOption == undefined) {
    //   Swal.fire({
    //     text: "Select one option against Statement (Yes/No/MayBe)",
    //     icon: 'error',
    //     confirmButtonText: 'OK'
    //   });
    //   this.validForm = false;
    //   return;
    // }
    // if (this.empSurveyModel.statementTwoRequestModel.StatementOption == undefined) {
    //   Swal.fire({
    //     text: "Select one option against Statement (Yes/No/MayBe)",
    //     icon: 'error',
    //     confirmButtonText: 'OK'
    //   });
    //   this.validForm = false;
    //   return;
    // }
    this.validForm = true;
  }

  statementCheck(p, status) {
    if (status == true) {
      let body = {
        empStatementID: null,
        statementDetailID: p.statementDetailID,
        statementID: p.statementID,
        empID: this.empModel.EmployeeRefNo,
        surveyID: p.surveyID
      }
      this.empSurveyModel.statementRequestModel.push(body);
      return;
    }
    else {
      var index = this.empSurveyModel.statementRequestModel.findIndex(
        (x) => x.statementID == p.statementID
      );
      this.empSurveyModel.statementRequestModel.splice(index, 1);
      return;
    }
  }

  getFeedBackStatements() {
    this.API.getdata('/admin/getFeedBackStatment?surveyID=1').subscribe(
      data => {
        if (data != null) {
          this.feedBackStatementResponseModel = data;
        }
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  checkFeedback(p, checkStatus, status) {
    if (status == "optionOneCheck") {
      var index = this.feedBackStatementResponseModelNew.findIndex(x => x.feedbackStatementDetailID == p.feedbackStatementDetailID);
      if (checkStatus == false) {
        this.feedBackStatementResponseModelNew[index].optionOne = false;
      }
      else {
        this.feedBackStatementResponseModelNew[index].optionOne = true;
        this.feedBackStatementResponseModelNew[index].optionTwo = false;
        this.feedBackStatementResponseModelNew[index].optionThree = false;
        this.feedBackStatementResponseModelNew[index].optionFour = false;
        this.feedBackStatementResponseModelNew[index].optionFive = false;
      }
    }
    if (status == "optionTwoCheck") {
      var index = this.feedBackStatementResponseModelNew.findIndex(x => x.feedbackStatementDetailID == p.feedbackStatementDetailID);
      if (checkStatus == false) {
        this.feedBackStatementResponseModelNew[index].optionTwo = false;
      }
      else {
        this.feedBackStatementResponseModelNew[index].optionTwo = true;
        this.feedBackStatementResponseModelNew[index].optionOne = false;
        this.feedBackStatementResponseModelNew[index].optionThree = false;
        this.feedBackStatementResponseModelNew[index].optionFour = false;
        this.feedBackStatementResponseModelNew[index].optionFive = false;
      }
    }
    if (status == "optionThreeCheck") {
      var index = this.feedBackStatementResponseModelNew.findIndex(x => x.feedbackStatementDetailID == p.feedbackStatementDetailID);
      if (checkStatus == false) {
        this.feedBackStatementResponseModelNew[index].optionThree = false;
      }
      else {
        this.feedBackStatementResponseModelNew[index].optionThree = true;
        this.feedBackStatementResponseModelNew[index].optionOne = false;
        this.feedBackStatementResponseModelNew[index].optionTwo = false;
        this.feedBackStatementResponseModelNew[index].optionFour = false;
        this.feedBackStatementResponseModelNew[index].optionFive = false;
      }
    }
    if (status == "optionFourCheck") {
      var index = this.feedBackStatementResponseModelNew.findIndex(x => x.feedbackStatementDetailID == p.feedbackStatementDetailID);
      if (checkStatus == false) {
        this.feedBackStatementResponseModelNew[index].optionFour = false;
      }
      else {
        this.feedBackStatementResponseModelNew[index].optionFour = true;
        this.feedBackStatementResponseModelNew[index].optionOne = false;
        this.feedBackStatementResponseModelNew[index].optionTwo = false;
        this.feedBackStatementResponseModelNew[index].optionThree = false;
        this.feedBackStatementResponseModelNew[index].optionFive = false;
      }
    }
    if (status == "optionFiveCheck") {
      var index = this.feedBackStatementResponseModelNew.findIndex(x => x.feedbackStatementDetailID == p.feedbackStatementDetailID);
      if (checkStatus == false) {
        this.feedBackStatementResponseModelNew[index].optionFive = false;
      }
      else {
        this.feedBackStatementResponseModelNew[index].optionFive = true;
        this.feedBackStatementResponseModelNew[index].optionOne = false;
        this.feedBackStatementResponseModelNew[index].optionTwo = false;
        this.feedBackStatementResponseModelNew[index].optionThree = false;
        this.feedBackStatementResponseModelNew[index].optionFour = false;
      }
    }
    if (checkStatus == true) {
      let body = {
        feedbackStatementID: p.feedbackStatementID,
        feedbackID: p.feedbackID,
        feedBackStatement: p.feedBackStatement,
        feedbackStatementDetailID: p.feedbackStatementDetailID,
        feedBackStatementDetail: p.feedBackStatementDetail,
        dissequence: p.dissequence,
        isActive: p.isActive,
        surveyID: p.surveyID,
        optionOne: p.optionOne,
        optionTwo: p.optionTwo,
        optionThree: p.optionThree,
        optionFour: p.optionFour,
        optionFive: p.optionFive
      }
      var index = this.empSurveyModel.feedBackStatementDetailRequest.findIndex(c => c.feedbackStatementDetailID == p.feedbackStatementDetailID);
      if (index != -1) {
        this.empSurveyModel.feedBackStatementDetailRequest[index] = body;
      }
      else {
        this.empSurveyModel.feedBackStatementDetailRequest.push(body);
      }
    }
    else {
      var index = this.empSurveyModel.feedBackStatementDetailRequest.findIndex(
        (x) => x.feedbackStatementDetailID == p.feedbackStatementDetailID
      );
      this.empSurveyModel.feedBackStatementDetailRequest.splice(index, 1);
    }

    if (this.submitted == true && (this.empSurveyModel.feedBackStatementDetailRequest.length != this.feedBackStatementResponseModelNew.length)) {
      this.JobFeedBackStatement = true;
    }
    else {
      this.JobFeedBackStatement = false;
    }
  }
  checkBoxStatementOne(p, checkStatus) {
    this.hardCodeArrOne.forEach((element) => {
      var checkdup = this.hardCodeArrOne.find(
        (x) => x.id == element.id
      );
      if ((checkStatus == true) && (p.id == checkdup.id)) {
        this.hardCodeArrOne[checkdup.id].optionChecked = true;
      }
      else {
        this.hardCodeArrOne[checkdup.id].optionChecked = false;
      }
    });

    var index = this.hardCodeArrOne.findIndex(
      (x) => x.optionChecked == true
    );
    if (index != -1) {
      let body = {
        detailfeedbackQuestion: "Would you recommend RAS as a good organization to work for?",
        empID: this.EmployeeCode,
        otherfeedback: null,
        otherfeedbackAnswer: this.hardCodeArrOne[index].name,
        surveyID: '1'
      }
      this.empSurveyModel.otherFeedBackModel[0] = body;
    }
    if (this.submitted == true) {
      if (index != -1) {
        this.SecondLastStatement = false;
      }
      else {
        this.SecondLastStatement = true;
      }
    }
  }

  checkBoxStatementTwo(p, checkStatus) {
    this.hardCodeArrTwo.forEach((element) => {
      var checkdup = this.hardCodeArrTwo.find(
        (x) => x.id == element.id
      );
      if ((checkStatus == true) && (p.id == checkdup.id)) {
        this.hardCodeArrTwo[checkdup.id].optionChecked = true;
      }
      else {
        this.hardCodeArrTwo[checkdup.id].optionChecked = false;
      }
    });

    var index = this.hardCodeArrTwo.findIndex(
      (x) => x.optionChecked == true
    );
    if (index != -1) {
      let body = {
        detailfeedbackQuestion: "I would consider working for this company again in the future.",
        empID: this.EmployeeCode,
        otherfeedback: null,
        otherfeedbackAnswer: this.hardCodeArrTwo[index].name,
        surveyID: '1'
      }
      this.empSurveyModel.otherFeedBackModel[1] = body;
    }

    if (this.submitted == true) {
      if (index != -1) {
        this.LastStatement = false;
      }
      else {
        this.LastStatement = true;
      }
    }
  }
  firstTextAreaChanged() {
    let body = {
      detailfeedbackQuestion: "What has your new place of employment offered you that is more attractive than your present job?",
      empID: this.EmployeeCode,
      otherfeedback: null,
      otherfeedbackAnswer: this.EmployeeForm.controls.firstTextArea.value,
      surveyID: '1'
    }
    this.empSurveyModel.otherFeedBackModel[2] = body;
  }
  secondTextAreaChanged() {
    let body = {
      detailfeedbackQuestion: "What are your recommendations or feedback for making RAS a better place to work?",
      empID: this.EmployeeCode,
      otherfeedback: null,
      otherfeedbackAnswer: this.EmployeeForm.controls.secondTextArea.value,
      surveyID: '1'
    }
    this.empSurveyModel.otherFeedBackModel[3] = body;
  }
}