export class surveydetailModel {
    empSurveyID: string;
    employeeName: string;
    createdDate: string;
    createdBy: string;
    empID: string;
}

export class feebackModelEmp {
    empFeedbackID: string;
    feedbackStatementDetailID: string;
    empID: string;
    surveyID: string;
    feedbackStatement: string;
    dissequence: string;
    feedbackStatementID: string;
    feedbackID: string;
    feedback: string;
    feedBackStatementDetail: string;
}

export class statementResponseModelNew {
    statementID: string;
    statementDescription: string;
    statementType: string;
    dissequence: string;
    isDeleted: boolean;
    isActive: boolean;
    surveyID: string;
    surveryName: string;
    statementDetailID: string;
}

export class otherFeedBackModel {
    otherfeedback: string;
    detailfeedbackQuestion: string;
    otherfeedbackAnswer: string;
    surveyID: string;
    empID: string;
}