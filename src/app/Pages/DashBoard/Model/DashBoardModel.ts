export class ReasonsReportModel {
    reasonCount: number;
    statementDetail: string;
}

export class feedbackQuestionsReportModel {
    fcount: number;
    feedback: string;
}

export class LastTwoStateReportModel {
    Qcount: number;
    Statement: string;
}

//.......................................................................
export class stationResponse {
    airportID: number;
    airportName: string;
    StationName: string;
}

export class requestSearch {
    airportID: string;
    StationName: string;
    gradeID: string;
    gradeName: string;
    genderID: string;
    genderName: string;
    fromDate: string;
    ToDate: string;
}
export class getDetail {
    ID: string;
    submitedBy: string;
    Email: string;
    Name: string;
    EmployeeName: string;
    RASNo: string;
    Gender: string;
    Designation: string;
    station: string;
    JoiningDate: string;
    ResignationDate: string;
    ApproverName: string;
    LastWorkingDate: string;
    lineManager: string;
    s1: string;
    s2: string;
    fb41: string;
    fb42: string;
    fb43: string;
    fb44: string;
    fb45: string;
    fb46: string;
    fb47: string;
    fb48: string;
    fb49: string;
    fb50: string;
    fb51: string;
    fb52: string;
    fb53: string;
    fb54: string;
    fb55: string;
    fb56: string;
    fb57: string;
    fb58: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
}