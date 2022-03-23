const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        blogTitle: {
            type: String,
            required: [true, "Please provide a Title"],
        },
        blogBody: {
            type: String,
            required: [true, "Please provide a blog body"],
        },
        authorName: {
            type: String,
            default: "Anonymous",
        },
        photo: {
            type: String,
            default: "public/uploads/defaultBlogImg.jpg"
        },

        blogCategory: {
            type: String
        },
        createdAt: { type: String, default: Date.now },
        doctorId: {
            type: mongoose.Schema.ObjectId,
            ref: "Doctor",
            required: [true, "A blog must be posted from a doctor account"],
        },
        commentId: [{
            type: mongoose.Schema.ObjectId,
            ref: "Comment",
        }],
        upvotes: [{ type: mongoose.Schema.ObjectId, ref: "Patient", required: true }],
    },

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model('Blog', blogSchema);

