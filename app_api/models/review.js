const name = 'review';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    intern: {type: Schema.Types.ObjectId, required: true, ref: 'internNotif'},
    student: {type: Schema.Types.ObjectId, required: true, ref: 'student'},
    grade: {type: Number},
    review: {type: String, default: ''}
});

module.exports = mongoose.model(name, reviewSchema);