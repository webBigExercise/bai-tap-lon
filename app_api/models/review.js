const name = 'review';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    intern: {type: Schema.Types.ObjectId, required: true},
    student: {type: Schema.Types.ObjectId, required: true},
    grade: {type: Number},
    review: {type: String, default: ''}
});

module.exports = mongoose.model(name, reviewSchema);