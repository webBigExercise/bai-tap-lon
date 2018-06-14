const mongoose = require('mongoose');
const { Schema } = mongoose;
const name = 'report';

const reportSchema = new Schema({
    sender : {type: Schema.Types.ObjectId, required: true},
    receiver: {type: Schema.Types.ObjectId, required: true},
    content: { type: String, default: '' },
    docLink: { type: String, default: '' }
});

module.exports = mongoose.model(name, reportSchema);