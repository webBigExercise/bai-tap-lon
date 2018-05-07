const name = 'admin';
const mongoose = require('mongoose');
const PersonSchema = require('./baseSchema/PersonSchema');
const schema_extend = require('mongoose-schema-extend');
// require('../plugins/mongo-extend');


const adminSchema = PersonSchema.extend({
    foo: String
})

module.exports = mongoose.model(name, adminSchema);