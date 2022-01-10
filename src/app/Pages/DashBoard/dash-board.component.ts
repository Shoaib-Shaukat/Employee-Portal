import { HostListener, Component, OnInit, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { ApiService } from '../../Services/API/api.service';
import { GvarService } from '../../Services/Globel/gvar.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label, Color, SingleDataSet } from 'ng2-charts';
import { ReasonsReportModel, feedbackQuestionsReportModel, LastTwoStateReportModel } from './Model/DashBoardModel';
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
  dtOptions1: any = {};
  dtTrigger1: Subject<any> = new Subject();
  dataTable: any;
  tableData = [];


  constructor(public route: Router, private popoutService: PopoutService, public API: ApiService, public GV: GvarService, private router: Router) {
    this.InitializeForm();
    this.ResponseReasonsReportModel = [];
    this.statementResponseModel = [];
    this.feedBackStatementResponseModelNew = [];
    this.feedbackQuestionsReportModel = [];
    this.LastTwoStateReportModel = [];
  }

  ngOnInit(): void {
    this.getStatements();
    this.getFeedBackDetail();
    this.getFeedBackStatementsDetail();
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
  InitializeForm(): any {
    this.StatementForm = new FormGroup({
      statementID: new FormControl(""),
      statementDescription: new FormControl(""),
      feedbackStatementDetailID: new FormControl(""),
      feedBackStatementDetail: new FormControl(""),
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
}