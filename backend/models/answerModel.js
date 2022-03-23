const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  _questionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
  answer: {
    type: String,
    required: true,
  },
  answeredBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor"
  },
  doctorName: {type: String},
  upvotes: [{ type: mongoose.Schema.ObjectId, ref: "Patient" }],
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
