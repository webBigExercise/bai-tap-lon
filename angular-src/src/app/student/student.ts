export interface Student {
    MSSV: {type: String, required: true, unique: true};
    name: {type: String, required: true};
    birth: {type: Date, required: true};
    address: {type: String, required: true};
    classroom: {type: String, required: true};
    startYear: {type: Number, required: true};
    speciality: {type: String, required: true};
    averageGrade: {type: Number, default: 0};
    granduatedYear: {type: Number, required: true};

    avatar: {type: String};
    privateEmail: {type: String};
    skypeID: {type: String};
    facebook: String;
    phoneNumber: {type: String, required: true};
    EnglishSkill: {type: String, default: 'tốt nghiệp THPT'};
    diploma: String;
    expreneced: Number;
    wantToBe: String;
    note: String;

    // skills: {type: [String], default: []};

    // projects: {type: [Schema.Types.ObjectId], default: []};
    // lecturer: {type: Schema.Types.ObjectId};
    // notifFollow: {type: [Schema.Types.ObjectId], default: []};
}

interface TokenResponse {
    token: string;
    message: string;
}

export interface TokenPayLoad {
    email: string;
    password: string;
}
