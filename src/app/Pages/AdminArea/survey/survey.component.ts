import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/Services/API/api.service';
import Swal from 'sweetalert2';
import { surveyModelRequest, surveyModelResponse } from './survey.Model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  submitted: boolean = false;
  surveyForm: FormGroup;
  formValid: boolean = false;
  addnewSurvey: boolean = false;
  showSurvey: boolean = true;
  showCancelButton: boolean = false;
  showSaveButton: boolean = false;
  showeditButton: boolean = false;
  shownewButton: boolean = true;

  surveyModelRequest: surveyModelRequest;
  surveyModelResponse: surveyModelResponse[];

  @ViewChildren(DataTableDirective)
  datatableElement: QueryList<DataTableDirective>;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;

  constructor(private API: ApiService) {
    this.surveyModelRequest = new surveyModelRequest;
    this.surveyModelResponse = [];
  }

  ngOnInit(): void {
    this.InitializeForm();
    this.getSurveys();
  }
  get f() { return this.surveyForm.controls; }

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

  InitializeForm(): any {
    this.surveyForm = new FormGroup({
      surveyID: new FormControl(""),
      surveryName: new FormControl("", [Validators.required]),
    });
  }

  showhide(callfrm: string) {
    if (callfrm == "New") {
      this.addnewSurvey = true;
      this.showSurvey = false;
      this.showCancelButton = true;
      this.showSaveButton = true;
      this.showeditButton = false;
      this.shownewButton = false;
    }
    if (callfrm == "Cancel") {
      this.submitted = false;
      this.addnewSurvey = false;
      this.showSurvey = true;
      this.showCancelButton = false;
      this.showSaveButton = false;
      this.showeditButton = false;
      this.shownewButton = true;
      this.surveyForm.reset();
      this.surveyForm.reset(this.surveyForm.value);
    }
    if (callfrm == "Edit") {
      this.addnewSurvey = true;
      this.showSurvey = false;
      this.showCancelButton = true;
      this.showSaveButton = false;
      this.showeditButton = true;
      this.shownewButton = false;
    }
  }

  getSurveys() {
    this.surveyModelResponse = [];
    this.API.getdata('/admin/getSurveys').subscribe(
      data => {
        if (data != null) {
          this.surveyModelResponse = data;
        }
        else {
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

  addSurvey() {
    this.validations();
    if (this.formValid == true) {
      this.surveyModelRequest = this.surveyForm.value;
      this.API.PostData('/admin/CreateSurvey', this.surveyModelRequest).subscribe(
        c => {
          if (c != null) {
            Swal.fire({
              text: 'Survey Saved Successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.getSurveys();
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

  editSurvey(p) {
    this.showhide("Edit");
    this.surveyForm.patchValue(p);
  }

  validations() {
    this.submitted = true;
    if (this.surveyForm.controls.surveryName.value == "" || this.surveyForm.controls.surveryName.value == null) {
      Swal.fire({
        text: "Enter Survey Name",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.formValid = false;
      return;
    }
    this.formValid = true;
  }

}
