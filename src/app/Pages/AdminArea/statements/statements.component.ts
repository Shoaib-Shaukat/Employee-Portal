import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '../../../Services/API/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GvarService } from '../../../Services/Globel/gvar.service'
import { DatePipe } from '@angular/common'
import { statementDetailRequest, statementDetailResponse, statementRequestModel, statementResponseModel } from './Statements.Model';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css']
})
export class StatementsComponent implements OnInit {
  @ViewChildren("addQuestionModal") addQuestionModal: ElementRef;
  submitted: boolean = false;
  statementRequestModel: statementRequestModel;
  statementResponseModel: statementResponseModel[];
  statementDetailRequest: statementDetailRequest;
  statementDetailResponse: statementDetailResponse[];
  @ViewChildren(DataTableDirective)
  datatableElement: QueryList<DataTableDirective>;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  validForm: boolean = false;
  validFormForTable: boolean = false;
  StatementForm: FormGroup;
  tableForm: FormGroup;
  AddQuestionForm: FormGroup;
  shownewButton: boolean = true;
  showeditButton: boolean = false;
  showSaveButton: boolean = false;
  showCancelButton: boolean = false;
  showStatements: boolean = true;
  addnewStatement: boolean = false;
  surveyModelResponse: any;

  constructor(public datepipe: DatePipe, public API: ApiService, public GV: GvarService) {
    this.statementRequestModel = new statementRequestModel;
    this.statementResponseModel = [];
    this.statementDetailRequest = new statementDetailRequest();
    this.statementDetailResponse = [];
  }
  InitializeForm(): any {
    this.StatementForm = new FormGroup({
      statementID: new FormControl(""),
      statementDescription: new FormControl(""),
      statementType: new FormControl(""),
      dissequence: new FormControl(""),
      surveyID: new FormControl(""),
      isActive: new FormControl(""),

    });

    this.tableForm = new FormGroup({
      surveyID: new FormControl(""),
    });

    this.AddQuestionForm = new FormGroup({
      statementDetailID: new FormControl(""),
      statementID: new FormControl(""),
      statementDetail: new FormControl(""),
      isActive: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.InitializeForm();
    this.submitted = false;
    this.getSurveys();
  }

  validationForALCode() {
    if (this.tableForm.controls.surveyID.value == "" || this.tableForm.controls.surveyID.value == null) {
      Swal.fire({
        text: "Select Survey",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormForTable = false;
      return;
    }
    this.validFormForTable = true;
  }

  showhide(callfrm: string) {
    if (callfrm == "New") {
      this.addnewStatement = true;
      this.showStatements = false;
      this.showCancelButton = true;
      this.showSaveButton = true;
      this.showeditButton = false;
      this.shownewButton = false;
      this.StatementForm.reset();
    }
    if (callfrm == "Cancel") {
      this.submitted = false;
      this.addnewStatement = false;
      this.showStatements = true;
      this.showCancelButton = false;
      this.showSaveButton = false;
      this.showeditButton = false;
      this.shownewButton = true;
      this.StatementForm.reset();
      this.tableForm.reset();
      this.statementResponseModel = [];
    }
    if (callfrm == "Edit") {
      this.addnewStatement = true;
      this.showStatements = false;
      this.showCancelButton = true;
      this.showSaveButton = false;
      this.showeditButton = true;
      this.shownewButton = false;
    }
  }

  get f() { return this.StatementForm.controls; }

  getSurveys() {
    this.surveyModelResponse = [];
    this.API.getdata('/admin/getSurveys').subscribe(
      data => {
        if (data != null) {
          this.surveyModelResponse = data;
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

  editStatement(p) {
    this.showhide("Edit");
    this.StatementForm.patchValue(p);
  }

  getStatements() {
    this.statementResponseModel = [];
    if (this.tableForm.controls.surveyID.value == "" || this.tableForm.controls.surveyID.value == null) {
      Swal.fire({
        text: "Select Survey First!",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    this.API.getdata('/admin/getStatements?surveyID=' + this.tableForm.controls.surveyID.value).subscribe(
      data => {
        if (data != null) {
          this.statementResponseModel = data;
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

  saveStatement() {
    this.validations();
    if (this.validForm == true) {
      if (this.StatementForm.controls.isActive.value == "" || this.StatementForm.controls.isActive.value == null) {
        this.StatementForm.controls.isActive.setValue(false);
      }
      this.statementRequestModel = this.StatementForm.value;
      this.API.PostData('/admin/CreateStatement', this.statementRequestModel).subscribe(c => {
        if (c != null) {
          Swal.fire({
            text: 'Statement Saved Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.showhide("Cancel");
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

  validations() {
    this.submitted = true;
    if (this.StatementForm.controls.surveyID.value == "" || this.StatementForm.controls.surveyID.value == null) {
      Swal.fire({
        text: "Select Survey",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.StatementForm.controls.statementDescription.value == "" || this.StatementForm.controls.statementDescription.value == null) {
      Swal.fire({
        text: "Enter Statement Description",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    this.validForm = true;
  }

  isActiveCheck(check: boolean) {
    if (check == true) {
      this.StatementForm.controls.isActive.setValue(true);
    } else {
      this.StatementForm.controls.isActive.setValue(false);
    }
  }
  isActiveCheckPopup(check: boolean) {
    if (check == true) {
      this.AddQuestionForm.controls.isActive.setValue(true);
    } else {
      this.AddQuestionForm.controls.isActive.setValue(false);
    }
  }

  cancelAddQuestion() {
    this.addQuestionModal["first"].nativeElement.click();
  }
  addQuestions(p) {
    this.AddQuestionForm.reset();
    this.AddQuestionForm.controls.statementID.setValue(p.statementID);
  }
  saveQuestion() {
    if (this.AddQuestionForm.controls.statementDetail.value == "" || this.AddQuestionForm.controls.statementDetail.value == null) {
      Swal.fire({
        text: "Enter Question",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    else {
      if (this.AddQuestionForm.controls.isActive.value == "" || this.AddQuestionForm.controls.isActive.value == null) {
        this.AddQuestionForm.controls.isActive.setValue(false);
      }
      this.statementDetailRequest = this.AddQuestionForm.value;
      this.API.PostData('/admin/CreateQuestions', this.statementDetailRequest).subscribe(c => {
        if (c != null) {
          Swal.fire({
            text: 'Question Saved Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          //this.showhide("Cancel");
          this.AddQuestionForm.reset();
          this.addQuestionModal["first"].nativeElement.click();
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

  viewQuestions(p) {
    this.statementDetailResponse = [];
    this.API.getdata('/admin/getStatementDetail?statementID=' + p.statementID).subscribe(
      data => {
        if (data != null) {
          this.statementDetailResponse = data;
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

  destroyDT = (tableIndex, clearData): Promise<boolean> => {
    return new Promise((resolve) => {
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
          }
          else {
            resolve(true);
          }

        }
      });
    });
  };
}
