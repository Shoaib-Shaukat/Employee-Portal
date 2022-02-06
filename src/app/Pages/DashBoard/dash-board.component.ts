import { HostListener, Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { ApiService } from '../../Services/API/api.service';
import { GvarService } from '../../Services/Globel/gvar.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color, SingleDataSet } from 'ng2-charts';
import { ReasonsReportModel, feedbackQuestionsReportModel, LastTwoStateReportModel, getDetail, requestSearch, stationResponse } from './Model/DashBoardModel';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { statementResponseModel } from '../AdminArea/statements/Statements.Model'
import { PopoutService } from '../Shared/Service/popout.service';
import { feedbackResponse, feedBackStatementResponseModelNew } from '../AdminArea/Feed-Back/FeedBack.Model';
@HostListener('window:beforeunload', ['$event'])
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  defaultStation: stationResponse;
  stationResponse: stationResponse[];
  validForm: boolean = false;
  requestSearch: requestSearch;
  getDetail: getDetail[];
  dashBoardForm: FormGroup;
  //.......................................
  statmentID: number = 0;
  LastTwoStateReportModel: LastTwoStateReportModel[];
  feedbackQuestionsReportModel: feedbackQuestionsReportModel[];
  feedBackStatementResponseModelNew: feedBackStatementResponseModelNew[];
  feedbackResponse: feedbackResponse[];
  StatementForm: FormGroup;
  statementResponseModel: statementResponseModel[];
  surveyModelResponse: any;
  showBarChart: boolean = false;
  public barChartLegend = false;
  public barChartPlugins = [];
  complaintCount = [];
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[] = [
    { data: [12, 68, 6] }
  ];

  public barChartLabelsNaturewise: Label[];
  public barChartDataNaturewise: ChartDataSets[] = [
    { data: [12, 68, 6] }
  ];
  public barChartLabelFeedback: Label[];
  public barChartDataFeedback: ChartDataSets[] = [
    { data: [12, 68, 6] }
  ];
  public barChartLabelFeedbackuestions: Label[];
  public barChartDataFeedbackQuestions: ChartDataSets[] = [
    { data: [12, 68, 6] }
  ];
  public barChartLabelLastTwoState: Label[];
  public barChartDataLastTwoState: ChartDataSets[] = [
    { data: [12, 68, 6] }
  ];
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {}
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
  public barChartTypefeedBack: ChartType = 'bar';
  public barChartOptionsfeedback: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {}
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
  ResponseReasonsReportModel: ReasonsReportModel[];
  @ViewChildren(DataTableDirective)
  datatableElement: QueryList<DataTableDirective>;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  tableData = [];


  constructor(public route: Router, private popoutService: PopoutService, public API: ApiService, public GV: GvarService, private router: Router) {
    this.InitializeForm();
    this.ResponseReasonsReportModel = [];
    this.statementResponseModel = [];
    this.feedBackStatementResponseModelNew = [];
    this.feedbackQuestionsReportModel = [];
    this.LastTwoStateReportModel = [];
    this.requestSearch = new requestSearch();
    this.getDetail = [];
    this.stationResponse = [];
    this.defaultStation = new stationResponse();
  }

  ngOnInit(): void {
    this.getStatements();
    this.getFeedBackDetail();
    this.getFeedBackStatementsDetail();
    //this.getStations();
    this.searchData();
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    this.dashBoardForm.get('fromDate').patchValue(this.formatDate(new Date(y, m, 1)));
    this.dashBoardForm.get('ToDate').patchValue(this.formatDate(new Date(y, m + 1, 0)));
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf'
      ]
    };
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
  InitializeForm(): any {
    this.StatementForm = new FormGroup({
      statementID: new FormControl(""),
      statementDescription: new FormControl(""),
      feedbackStatementDetailID: new FormControl(""),
      feedBackStatementDetail: new FormControl(""),
    });
    this.dashBoardForm = new FormGroup({
      airportID: new FormControl(""),
      StationName: new FormControl(""),
      gradeID: new FormControl(""),
      gradeName: new FormControl(""),
      genderID: new FormControl(""),
      genderName: new FormControl(""),
      fromDate: new FormControl(""),
      ToDate: new FormControl(""),
    });
  }

  getStatements() {
    this.API.getdata('/admin/getStatements?surveyID=' + 1).subscribe(
      data => {
        if (data != null) {
          this.statementResponseModel = data;

          this.statementResponseModel.forEach((x) => {
            if (x.statementDescription.length > 65) {
              x.statementDescription = x.statementDescription.substring(0, 65) + '...';
            }
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
  ReasonsReportModel() {
    this.API.getdata('/Admin/ReasonsReportModel?statementID=5').subscribe(c => {
      if (c != null) {
        this.ResponseReasonsReportModel = c;
      }
    }, (err) => {
      console.log('-----> err', err);
    });
  }
  getFeedBackDetail() {
    this.API.getdata('/admin/getFeedBackStatment?surveyID=1').subscribe(
      data => {
        if (data != null) {
          this.feedbackResponse = data;
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
  getBarChartHorizental() {
    this.API.getdata('/Admin/ReasonsReportModel?statementID=' + this.StatementForm.controls.statementID.value).subscribe(c => {
      if (c != null) {
        this.ResponseReasonsReportModel = c;
        this.complaintCount = this.ResponseReasonsReportModel.map((item) => {
          return item.reasonCount;
        });
        this.barChartDataNaturewise = [{ data: this.complaintCount, backgroundColor: '#8f2e2e', hoverBackgroundColor: '#a34e4e', fill: false }];
        var complaintDept = [];
        complaintDept = this.ResponseReasonsReportModel.map((item) => {
          return item.statementDetail;
        });
        this.barChartLabelsNaturewise = complaintDept;
        this.showBarChart = true;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        // this.router.navigateByUrl('/login');
      });
  }

  getFeedBackStatementsDetail() {
    this.API.getdata('/admin/getfeedbackStatementDetail?surveyID=1').subscribe(
      data => {
        if (data != null) {
          this.feedBackStatementResponseModelNew = data;

          this.feedBackStatementResponseModelNew.forEach((x) => {
            if (x.feedBackStatementDetail.length > 65) {
              x.feedBackStatementDetail = x.feedBackStatementDetail.substring(0, 65) + '...';
            }
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

  getBarChartFQ() {
    this.API.getdata('/Admin/FeedBackReportModel?feedbackStatementDetailID=' + this.StatementForm.controls.feedbackStatementDetailID.value).subscribe(c => {
      if (c != null) {
        this.feedbackQuestionsReportModel = c;
        this.complaintCount = this.feedbackQuestionsReportModel.map((item) => {
          return item.fcount;
        });
        this.barChartDataFeedbackQuestions = [{ data: this.complaintCount, backgroundColor: '#8f2e2e', hoverBackgroundColor: '#a34e4e', fill: false }];
        var complaintDept = [];
        complaintDept = this.feedbackQuestionsReportModel.map((item) => {
          return item.feedback;
        });
        this.barChartLabelFeedbackuestions = complaintDept;
        this.showBarChart = true;
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

  getBarChartLastSt() {
    var e: any = document.getElementById("ddlViewBy");
    if (e.value == 1) {
      this.statmentID = 1;
    }
    else if (e.value == 2) {
      this.statmentID = 2;
    }
    else {
      Swal.fire({
        text: 'Select Statement',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return
    }
    this.API.getdata('/Admin/QuestionReportModel?ID=' + this.statmentID).subscribe(c => {
      if (c != null) {
        this.LastTwoStateReportModel = c;
        this.complaintCount = this.LastTwoStateReportModel.map((item) => {
          return item.Qcount;
        });
        this.barChartDataLastTwoState = [{ data: this.complaintCount, backgroundColor: '#8f2e2e', hoverBackgroundColor: '#a34e4e', fill: false }];
        var complaintDept = [];
        complaintDept = this.LastTwoStateReportModel.map((item) => {
          return item.Statement;
        });
        this.barChartLabelLastTwoState = complaintDept;
        this.showBarChart = true;
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
  resetFirstChart() {
    this.ResponseReasonsReportModel = [];
    this.StatementForm.controls.statementID.setValue("");
  }
  resetSecondChart() {
    this.feedbackQuestionsReportModel = [];
    this.StatementForm.controls.feedbackStatementDetailID.setValue("");
  }
  resetThirdChart() {
    this.statmentID = 0;
    this.LastTwoStateReportModel = [];
  }
  //..............................................Dashboard................................................................

  getStations() {
    this.API.getdata("/Generic/getStations").subscribe(
      (c) => {
        if (c != null) {
          this.stationResponse = c;
          this.defaultStation.airportID = 0;
          this.defaultStation.StationName = "ALL";
          this.stationResponse.push(this.defaultStation);
          this.dashBoardForm.controls.airportID.setValue(0);
        }
      },
      (error) => {
        Swal.fire({
          text: error.error.Message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }
  genderChanged() {
    if (this.dashBoardForm.controls.genderName.value == "Select Gender") {
      this.dashBoardForm.controls.genderName.setValue("");
      this.dashBoardForm.controls.genderID.setValue(0);
    }
    else if (this.dashBoardForm.controls.genderName.value == "Male") {
      this.dashBoardForm.controls.genderID.setValue(1);
    }
    else if (this.dashBoardForm.controls.genderName.value == "Female") {
      this.dashBoardForm.controls.genderID.setValue(2);
    }
    else if (this.dashBoardForm.controls.genderName.value == "Other") {
      this.dashBoardForm.controls.genderID.setValue(3);
    }
  }

  validations() {
    if (this.dashBoardForm.controls.fromDate.value == "" || this.dashBoardForm.controls.fromDate.value == undefined || this.dashBoardForm.controls.fromDate.value == null) {
      Swal.fire({
        text: "Select From Date",
        icon: "error",
        confirmButtonText: "OK",
      });
      this.validForm = false;
      return;
    }
    if (this.dashBoardForm.controls.ToDate.value == "" || this.dashBoardForm.controls.ToDate.value == undefined || this.dashBoardForm.controls.ToDate.value == null) {
      Swal.fire({
        text: "Select To Date",
        icon: "error",
        confirmButtonText: "OK",
      });
      this.validForm = false;
      return;
    }
    this.validForm = true;
  }

  searchData() {
    this.API.getdata('/Admin/report').subscribe(c => {
      if (c != null) {
        this.destroyDT(0, true).then((destroyed) => {
          this.getDetail = c;
          this.getDetail.sort((a, b) => a.ID < b.ID ? 1 : a.ID > b.ID ? -1 : 0);
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
}