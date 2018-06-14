const name = 'partner';
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { Schema } = mongoose;
require('mongoose-schema-extend');
// require('../plugins/mongo-extend');
const PersonSchema = require('./baseSchema/PersonSchema');

const partnerSchema = PersonSchema.extend({
    name: { type: String, required: true },
    info: {type: String, required: true},
    listProject: { type: [{
        type: Schema.Types.ObjectId,
        ref: 'project'
    }], default: [] },
    listNotiF: { type: [{type: Schema.Types.ObjectId, ref: 'internNotif'}], default: [] },
    reports: {type: [{type: Schema.Types.ObjectId, ref: 'report'}], default: []}
})

// const partnerSchema = new Schema({
//     username: {type: String, required: true},
//     password: {type: String, required: true}
// });

module.exports = mongoose.model(name, partnerSchema);