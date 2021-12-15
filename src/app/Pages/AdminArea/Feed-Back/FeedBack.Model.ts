export class feedbackResponse {
    feedbackStatementID: string;
    feedbackID: string;
    feedBackStatement: string;
    surveyID: string;
    optionOne: boolean = false;
    optionTwo: boolean = false;
    optionThree: boolean = false;
    optionFour: boolean = false;
    optionFive: boolean = false;
    empID: string;
}
export class FeedBackStatementRequest {
    feedbackStatementID: string;
    feedbackID: string;
    feedBackStatement: string;
    surveyID: string;

}


export class feedBackStatementRequestModel {
    feedbackStatementID: string;
    feedbackID: string;
    feedBackStatement: string;
    isActive: boolean;
    surveyID: string;
    dissequence: string;
}

export class feedBackStatementResponseModel {
    feedbackStatementID: string;
    feedbackID: string;
    feedBackStatement: string;
    isActive: boolean;
    dissequence: string;
    surveyID: string;
    surveryName: string;
}

export class feedBackStatementDetailRequest {
    feedbackStatementDetailID: string;
    feedbackStatementID: string;
    feedBackStatementDetail: string;
    isDeleted: boolean;
    isActive: boolean;
    surveyID: string;
}

export class feedBackStatementDetailResponse {
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

export class feedBackStatementResponseModelNew {
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