export class empResponse {
    empModel: empModel
    Status: string;
    Message: string;
}
export class empModel {
    EmployeeRefNo: string;
    EmployeeName: string;
    FatherHusbandName: string;
    BirthDate: string;
    Sex: string;
    MobileNumber: string;
    Telephone: string;
    PersonalEmail: string;
    Address: string;
    PermanentAddress: string;
    CountryTitle: string;
    DepartmentID: string;
    EmployeeGradeTitle: string;
    ApproverName: string;
    DepartmentRefNo: string;
    DepartmentTitle: string;
    DesignationID: string;
    DesignationRefNo: string;
    DesignationTitle: string;
    BranchID: string;
    BranchRefNo: string;
    BranchTitle: string;
    LeavingReasonID: string;
    LeavingReasonRefNo: string;
    LeavingReasonTitle: string;
    AppointmentDate: string;
    JoiningDate: string;
    ResignationDate: string;
    LeavingDate: string;
    HasLeaved: boolean
    ConfirmationDate: string;
    HasConfirmed: boolean
    ServicePeriod: string;
    ServicePeriodInYear: string;
    ServicePeriodInMonth: string;
    IsContractual: boolean;
    Grade: string;
}


export class SrveyDetailResponse {
    dissequence: string;
    statementDescription: string;
    statementDetail: string;
    statementDetailID: string;
    statementID: string;
    statementType: string;
    surveyID: string;
    checked: boolean;
}

export class SaveEmpFormDetailRequest {
    EmployeeRefNo: string;
    surveyID: string;
    statementDetailID: string;
}

export class feedBackStatementDetailRequest {
    feedbackStatementID: string;
    feedbackID: string;
    feedBackStatement: string;
    isActive: boolean;
    surveyID: string;
    optionOne: boolean;
    optionTwo: boolean;
    optionThree: boolean;
    optionFour: boolean;
    optionFive: boolean;
    feedbackStatementDetailID: string;
    feedBackStatementDetail: string;
    dissequence: string;
}


export class empSurveyModel {
    empModel: empModel;
    statementRequestModel: statementRequestModel[];
    feedBackStatementDetailRequest: feedBackStatementDetailRequest[];
    otherFeedBackModel: otherFeedBackModel[];
    constructor() {
        this.empModel = new empModel();
        this.otherFeedBackModel = [];
        this.statementRequestModel = [];
        this.feedBackStatementDetailRequest = [];
    }
}
export class statementRequestModel {
    empStatementID: string;
    statementDetailID: string;
    statementID: string;
    empID: string;
    surveyID: string;
}
export class empFeedbackRequestModel {
    feedbackStatementID: string;
    feedbackID: string;
    feedBackStatement: string;
    isActive: boolean;
    surveyID: string;
    optionOne: boolean;
    optionTwo: boolean;
    optionThree: boolean;
    optionFour: boolean;
    optionFive: boolean;
}

export class otherFeedBackModel {
    otherfeedback: string;
    detailfeedbackQuestion: string;
    otherfeedbackAnswer: string;
    surveyID: string;
    empID: string;
}