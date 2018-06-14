const name = 'student';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PersonSchema = require('./baseSchema/PersonSchema');
require('mongoose-schema-extend');
// require('../plugins/mongo-extend');

const studentSchema = PersonSchema.extend({

    //admin provide
    MSSV: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    birth: { type: Date, required: true },
    address: { type: String, required: true },
    classroom: { type: String, required: true },
    startYear: { type: Number, required: true },
    speciality: { type: String, required: true },
    // vnuMail : {type: String, required: true},
    averageGrade: { type: Number, default: 0 },
    granduatedYear: { type: Number, required: true },

    //user manage 
    avatar: { type: String },
    privateEmail: { type: String },
    skypeID: { type: String },
    facebook: String,
    phoneNumber: { type: String, required: true },
    EnglishSkill: { type: String, default: 'tốt nghiệp THPT' },
    diploma: String,
    expreneced: Number,
    wantToBe: String,
    note: String,

    //skills
    skills: { type: [String], default: [] },

    //attended project
    projects: {
        type: [{ type: Schema.Types.ObjectId, ref: 'project' }],
        default: []
    },
    lecturer: { type: Schema.Types.ObjectId },
    notifFollow: {
        type: [{ type: Schema.Types.ObjectId, ref: 'internNotif' }],
        default: []
    },
    reports: { type: [{type: Schema.Types.ObjectId, ref: 'report'}], default: [] },
    grade: {type: Number, default: 0},
    comment: {type: String, default: ''}
});

module.exports = mongoose.model(name, studentSchema);
