const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.ObjectId,
    ref: "Blog",
  },
  comment: {
    type: String,
    required: true,
  },
  commentedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
  },
  name: String,
});

module.exports = mongoose.model("Comment", commentSchema);
