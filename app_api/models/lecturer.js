const name = 'lecturer';
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const util = require('util');
require('mongoose-schema-extend');
// require('../plugins/mongo-extend');
const PersonSchema = require('./baseSchema/PersonSchema');

const lecturerSchema = PersonSchema.extend({

    birthday: {type: Date, required: true},
    vnumail: {type: String},
    phone: {type:String},
    note: {type:String, default: ''},


    name: { type: String, required: true },
    listProject: { type: [Schema.Types.ObjectId], default: [] },
    listNotiF: { type: [Schema.Types.ObjectId], default: [] },
    reports: {type: [Schema.Types.ObjectId], default: []}
});

module.exports = mongoose.model(name, lecturerSchema);