const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionTitle: {
      type: String,
      required: true,
    },
    questionBody: {
      type: String,
      required: true,
    },
    questionCategory: {
      type: String,
      required: true
    },
    _askerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Patient",
    },
    createdAt: { type: String, default: Date.now },
    askedBy: {
      type: String,
      default: "anonymous",
    },
    _answersId: [{
      type: mongoose.Schema.ObjectId,
      ref: "Answer",
    }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate for q&a
questionSchema.virtual("answers", {
  ref: "Answer",
  foreignField: "_questionId",
  localField: "_id",
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
