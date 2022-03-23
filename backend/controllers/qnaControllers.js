const mongoose = require("mongoose");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Answer = require("../models/answerModel");
const HttpError = require("../models/http-error");
const catchAsync = require("../utils/catchAsync");
const Question = require("../models/questionModel");

const sort = (questions, sortBy) => {
  let filteredQuestionsSorted;
  if (sortBy === `dateAsc`) {
    filteredQuestionsSorted = questions.sort((a, b) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  } else if (sortBy === `dateDesc`) {
    filteredQuestionsSorted = questions.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });
  } else if (sortBy === `ansAsc`) {
    filteredQuestionsSorted = questions.sort((a, b) => {
      return Number(a._answersId.length) - Number(b._answersId.length);
    });
  } else if (sortBy === `ansDesc`) {
    filteredQuestionsSorted = questions.sort((a, b) => {
      return Number(b._answersId.length) - Number(a._answersId.length);
    });
  }
  return filteredQuestionsSorted;
};

exports.getAllQuestion = catchAsync(async (req, res, next) => {
  let { category, sortBy } = req.query;

  if (!sortBy) {
    sortBy = "dateDesc";
  }

  if (!category) {
    let questions = await Question.find().populate("_answersId");
    questions = sort(questions, sortBy);
    res.status(200).json({
      message: "successful",
      No_of_questions: questions.length,
      data: {
        questions,
      },
    });
  } else {
    let questions = await Question.find({
      questionCategory: category,
    }).populate("_answersId");
    questions = sort(questions, sortBy);
    res.status(200).json({
      message: "successful",
      No_of_questions: questions.length,
      data: {
        questions,
      },
    });
  }
});

exports.getQuestionByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.query;
  if (!category) {
    const questions = await Question.find().populate("_answersId");
    res.status(200).json({
      message: "successful",
      No_of_questions: questions.length,
      data: {
        questions,
      },
    });
  } else {
    const questions = await Question.find({ category: category }).populate(
      "_answersId"
    );
    res.status(200).json({
      message: "successful",
      No_of_questions: questions.length,
      data: {
        questions,
      },
    });
  }
});

exports.askAQuestion = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { questionTitle, questionBody, questionCategory, askedBy } = req.body;
  const userId = req.userData.id;
  const newQuestion = new Question({
    questionTitle: questionTitle,
    questionBody: questionBody,
    questionCategory: questionCategory,
    askedBy: askedBy,
    _askerId: userId,
  });
  const patient = await Patient.findById(userId);
  if (!patient) throw new HttpError("User Not Found", 404);
  const session = await mongoose.startSession();
  session.startTransaction();
  await newQuestion.save({ session: session });
  patient.questions.push(newQuestion);
  await patient.save({ session: session });
  await session.commitTransaction();
  res.status(201).json({
    message: "successful",
    data: {
      newQuestion,
    },
  });
});

exports.getQuestionsOfAnUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await Patient.findById(id).populate("questions");
  res.status(200).json({
    message: "successful",
    data: {
      questions: user.questions.map((id) => id.toObject({ getters: true })),
    },
  });
});

exports.getAQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id).populate(
    "_answersId"
  );
  res.status(200).json({
    message: "successful",
    data: {
      question,
      id: req.userData.id,
    },
  });
});

exports.getAnAnswer = catchAsync(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);
  res.status(200).json({
    message: "successful",
    data: {
      answer,
    },
  });
});

exports.answerQuestion = catchAsync(async (req, res, next) => {
  if (req.userData.type === "Patient") throw new AppError("Unauthorized", 400);
  const doctor = await Doctor.findById(req.userData.id);
  const quesId = req.params.id;
  const newAnswer = new Answer({
    _questionId: req.params.id,
    answer: req.body.answer,
    answeredBy: doctor.id,
    doctorName: doctor.name,
    upvotes: [],
  });
  const session = await mongoose.startSession();
  session.startTransaction();
  await newAnswer.save({ session: session });
  const question = await Question.findById(quesId);
  question._answersId.push(newAnswer);
  await question.save({ session: session });
  await session.commitTransaction();
  res.status(201).json({
    message: "successful",
    data: {
      newAnswer,
    },
  });
});

exports.upvoteAnswer = catchAsync(async (req, res, next) => {
  const ansId = req.params.id;
  const id = req.userData.id;
  const answer = await Answer.findById(ansId);
  const isUpvoted = answer.upvotes.length && answer.upvotes.includes(id);
  const option = isUpvoted ? "$pull" : "$addToSet";
  const ans = await Answer.findByIdAndUpdate(
    ansId,
    {
      [option]: { upvotes: id },
    },
    { new: true }
  );
  res.status(201).json({
    message: "success",
    data: {
      ans,
    },
  });
});
