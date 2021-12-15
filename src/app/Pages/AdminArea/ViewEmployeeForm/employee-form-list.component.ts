import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/Services/API/api.service';
import Swal from 'sweetalert2';
import { feedbackResponse, feedBackStatementResponseModel, feedBackStatementResponseModelNew } from '../Feed-Back/FeedBack.Model';
import { empModel, SrveyDetailResponse } from '../HR-Page/EmpForm.Model';
import { statementResponseModel } from '../statements/Statements.Model';
import { feebackModelEmp, otherFeedBackModel, statementResponseModelNew, surveydetailModel } from './SurveyList.Model';

@Component({
  selector: 'app-employee-form-list',
  templateUrl: './employee-form-list.component.html',
  styleUrls: ['./employee-form-list.component.css']
})
export class EmployeeFormListComponent implements OnInit {
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
  feedBackStatementResponseModelNew: feedBackStatementResponseModelNew[];
  feedBackStatementResponseModel: feedBackStatementResponseModel[];
  otherFeedBackModel: otherFeedBackModel[];
  SrveyDetailResponse: SrveyDetailResponse[];
  statementResponseModelNew: statementResponseModelNew[];
  feebackModelEmp: feebackModelEmp[];
  feedbackResponse: feedbackResponse[];
  statementResponseModel: statementResponseModel[];
  EmployeeForm: FormGroup;
  submitted: boolean = false;
  formValid: boolean = false;
  viewSurvey: boolean = false;
  showSurvey: boolean = true;
  showCancelButton: boolean = false;
  showSaveButton: boolean = false;
  showeditButton: boolean = false;
  shownewButton: boolean = true;
  empModel: empModel;
  surveydetailModel: surveydetailModel[];

  @ViewChildren(DataTableDirective)
  datatableElement: QueryList<DataTableDirective>;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  currentDate: any;

  constructor(private API: ApiService) {
    this.surveydetailModel = [];
    this.empModel = new empModel();
    this.statementResponseModel = [];
    this.feedbackResponse = [];
    this.feebackModelEmp = [];
    this.statementResponseModelNew = [];
    this.SrveyDetailResponse = [];
    this.otherFeedBackModel = [];
    this.feedBackStatementResponseModel = [];
    this.feedBackStatementResponseModelNew = [];
  }

  ngOnInit(): void {
    this.getSurveyList();
    this.InitializeForm();
    this.getFeedBackStatements();
    this.getFeedBackStatementsDetail();
    this.currentDate = this.formatDate(new Date());
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
      firstTextArea: new FormControl(""),
      secondTextArea: new FormControl(""),
    });
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  destroyDT = (tableIndex, clearData): Promise<boolean> => {
    return new Promise((resolve) => {
      if (this.datatableElement)
        this.datatableElement.forEach((dtElement: DataTableDirective, index) => {

          if (index == tableIndex) {
            if (dtElement.dtInstance) {

              if (tableIndex == 0) {
                dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  if (clearData) {
                    dtInstance.clear();
                  }
                  dtInstance.destroy();
                  resolve(true);
                });
              }
              else if (tableIndex == 1) {
                dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  if (clearData) {
                    dtInstance.clear();
                  }
                  dtInstance.destroy();
                  resolve(true);
                });

              } else if (tableIndex == 2) {
                dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  if (clearData) {
                    dtInstance.clear();
                  }
                  dtInstance.destroy();
                  resolve(true);
                });
              }
              else if (tableIndex == 3) {
                dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  if (clearData) {
                    dtInstance.clear();
                  }
                  dtInstance.destroy();
                  resolve(true);
                });

              }
              else if (tableIndex == 4) {
                dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                  if (clearData) {
                    dtInstance.clear();
                  }
                  dtInstance.destroy();
                  resolve(true);
                });
              }
            }
            else {
              resolve(true);
            }
          }
        });
    });
  };

  showhide(callfrm: string) {
    if (callfrm == "New") {
      this.viewSurvey = true;
      this.showSurvey = false;
      this.showCancelButton = true;
      this.showSaveButton = true;
      this.showeditButton = false;
      this.shownewButton = false;
    }
    if (callfrm == "Cancel") {
      this.submitted = false;
      this.viewSurvey = false;
      this.showSurvey = true;
      this.showCancelButton = false;
      this.showSaveButton = false;
      this.showeditButton = false;
      this.shownewButton = true;
      this.EmployeeForm.reset();
      this.empModel = new empModel();
      this.statementResponseModel = [];
      this.feedbackResponse = [];
      this.feebackModelEmp = [];
      this.statementResponseModelNew = [];
      this.SrveyDetailResponse = [];
      this.otherFeedBackModel = [];
      this.getFeedBackStatements();
      this.getFeedBackStatementsDetail();
      this.hardCodeArrOne.forEach(x => {
        x.optionChecked = false;
      });
      this.hardCodeArrTwo.forEach(x => {
        x.optionChecked = false;
      });
    }
    if (callfrm == "Edit") {
      this.viewSurvey = true;
      this.showSurvey = false;
      this.showCancelButton = true;
      this.showSaveButton = false;
      this.showeditButton = true;
      this.shownewButton = false;
    }
  }

  getSurveyList() {
    this.surveydetailModel = [];
    this.API.getdata('/admin/getSurveyDetail?surveyID=1').subscribe(
      data => {
        if (data != null) {
          this.destroyDT(0, false).then(destroyed => {
            this.surveydetailModel = data;
            this.dtTrigger.next();
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

  viewSurveyFunc(p) {
    this.API.getdata('/admin/GetEmployeeInfoByEmployeeCode?empID=' + p.empID).subscribe(
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
        }
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });

    this.API.getdata('/admin/getSurveyDetailByEmp?empID=' + p.empID).subscribe(
      data => {
        if (data != null) {
          this.statementResponseModelNew = data;
          this.statementResponseModelNew = this.statementResponseModelNew.sort((a, b) => (a.dissequence > b.dissequence) ? 1 : -1);

          this.API.getdata('/Admin/getSurveytDetail?surveyID=1').subscribe(
            data => {
              if (data != null) {
                this.SrveyDetailResponse = data;
                this.SrveyDetailResponse = this.SrveyDetailResponse.sort((a, b) => (a.dissequence > b.dissequence) ? 1 : -1);
                for (let i = 0; i < this.SrveyDetailResponse.length; i++) {
                  for (let j = 0; j < this.statementResponseModelNew.length; j++) {
                    if (this.SrveyDetailResponse[i].statementDetailID == this.statementResponseModelNew[j].statementDetailID) {
                      this.SrveyDetailResponse[i].checked = true;
                    }
                  }
                }
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
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });

    this.API.getdata('/admin/getempFeedback?empID=' + p.empID).subscribe(
      data => {
        if (data != null) {
          this.feebackModelEmp = data;
          for (let i = 0; i < this.feebackModelEmp.length; i++) {
            if (this.feebackModelEmp[i].feedbackID == '1') {
              var index = this.feedBackStatementResponseModelNew.findIndex((x) => x.feedbackStatementDetailID == this.feebackModelEmp[i].feedbackStatementDetailID);
              this.feedBackStatementResponseModelNew[index].optionOne = true;
            }
            else if (this.feebackModelEmp[i].feedbackID == '2') {
              var index = this.feedBackStatementResponseModelNew.findIndex((x) => x.feedbackStatementDetailID == this.feebackModelEmp[i].feedbackStatementDetailID);
              this.feedBackStatementResponseModelNew[index].optionTwo = true;
            }
            else if (this.feebackModelEmp[i].feedbackID == '3') {
              var index = this.feedBackStatementResponseModelNew.findIndex((x) => x.feedbackStatementDetailID == this.feebackModelEmp[i].feedbackStatementDetailID);
              this.feedBackStatementResponseModelNew[index].optionThree = true;
            }
            else if (this.feebackModelEmp[i].feedbackID == '4') {
              var index = this.feedBackStatementResponseModelNew.findIndex((x) => x.feedbackStatementDetailID == this.feebackModelEmp[i].feedbackStatementDetailID);
              this.feedBackStatementResponseModelNew[index].optionFour = true;
            }
            else {
              var index = this.feedBackStatementResponseModelNew.findIndex((x) => x.feedbackStatementDetailID == this.feebackModelEmp[i].feedbackStatementDetailID);
              this.feedBackStatementResponseModelNew[index].optionFive = true;
            }
          }
        }
      },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });

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

    this.API.getdata('/admin/getOtherfeedBack?empID=' + p.empID).subscribe(
      data => {
        if (data != null) {
          this.otherFeedBackModel = data;
          if (this.otherFeedBackModel[0].otherfeedbackAnswer == 'Yes') {
            this.hardCodeArrOne[0].optionChecked = true;
          }
          else if (this.otherFeedBackModel[0].otherfeedbackAnswer == 'No') {
            this.hardCodeArrOne[1].optionChecked = true;
          }
          else {
            this.hardCodeArrOne[2].optionChecked = true;
          }

          if (this.otherFeedBackModel[1].otherfeedbackAnswer == 'Yes') {
            this.hardCodeArrTwo[0].optionChecked = true;
          }
          else if (this.otherFeedBackModel[1].otherfeedbackAnswer == 'No') {
            this.hardCodeArrTwo[1].optionChecked = true;
          }
          else {
            this.hardCodeArrTwo[2].optionChecked = true;
          }

          this.EmployeeForm.controls.firstTextArea.setValue(this.otherFeedBackModel[2].otherfeedbackAnswer);
          this.EmployeeForm.controls.secondTextArea.setValue(this.otherFeedBackModel[3].otherfeedbackAnswer);
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
}

