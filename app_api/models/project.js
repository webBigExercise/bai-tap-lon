const name = 'project';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentCommentSchema = new Schema({
    studentId : {type: Schema.Types.ObjectId, required: true},
    comment: {type: String, default: ''},
    grade: {type: Number, required: true}
})

const ProjectSchema = new Schema({

    //current student on project
    students: { type: [StudentCommentSchema], default: [] },
    ownerId: { type: Schema.Types.ObjectId, required: true },

    requiredSkills: { type: [String], required: true },
    name: { type: String, required: true }
})

module.exports = mongoose.model(name, ProjectSchema);