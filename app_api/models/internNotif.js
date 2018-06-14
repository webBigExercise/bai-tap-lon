const mongoose = require('mongoose');
const { Schema } = mongoose;
const name = 'internNotif';

const internNotifSchema = new Schema({
    title: {type: String, required: true},
    ownerId: { type: Schema.Types.ObjectId, ref: 'partner'},
    content: { type: String, default: '' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    followers: { type: [{type: Schema.Types.ObjectId, ref: 'student'}], default: [] }
});

module.exports = mongoose.model(name, internNotifSchema);