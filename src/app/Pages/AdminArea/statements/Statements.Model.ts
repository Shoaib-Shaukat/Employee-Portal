export class statementRequestModel {
    statementID: string;
    statementDescription: string;
    statementType: string;
    dissequence: string;
    surveyID: string;
    isActive: boolean;
}

export class statementResponseModel {
    statementID: string;
    statementDescription: string;
    statementType: string;
    dissequence: string;
    isDeleted: boolean;
    isActive: boolean;
    surveyID: string;
    surveryName: string;
}

export class statementDetailRequest {
    statementDetailID: string;
    statementID: string;
    statementDetail: string;
    isActive: boolean;
}

export class statementDetailResponse {
    statementID: string;
    statementDescription: string;
    statementType: string;
    dissequence: string;
    surveyID: string;
    statementDetailID: string;
    statementDetail: string;
}