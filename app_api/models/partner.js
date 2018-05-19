const name = 'partner';
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { Schema } = mongoose;
require('mongoose-schema-extend');
// require('../plugins/mongo-extend');
const PersonSchema = require('./baseSchema/PersonSchema');

const partnerSchema = PersonSchema.extend({
    name: { type: String, required: true },
    listProject: { type: [Schema.Types.ObjectId], default: [] },
    listNotiF: { type: [Schema.Types.ObjectId], default: [] },
    reports: {type: [Schema.Types.ObjectId], default: []}
})

// const partnerSchema = new Schema({
//     username: {type: String, required: true},
//     password: {type: String, required: true}
// });

module.exports = mongoose.model(name, partnerSchema);