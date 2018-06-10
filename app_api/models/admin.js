const name = 'admin';
const mongoose = require('mongoose');
const PersonSchema = require('./baseSchema/PersonSchema');
const schema_extend = require('mongoose-schema-extend');
// require('../plugins/mongo-extend');


const adminSchema = PersonSchema.extend({
    name: {type: String, required: true},
    vnumail: {type: String, required: true},
    gmail: {type: String, required: true},
    password: {type: String, required: true},
    phoneNum: {type: String, required: true},
    listExcelReport: {type: [String], default: []}
})

module.exports = mongoose.model(name, adminSchema);