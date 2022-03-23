const mongoose = require("mongoose");
const Doctor = require("../models/doctor");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const HttpError = require("../models/http-error");
const catchAsync = require("../utils/catchAsync");

exports.createBlog = catchAsync(async (req, res, next) => {
  const { blogTitle, blogBody, blogCategory } = req.body;
  const userId = req.userData.id;
  const user = await Doctor.findById(userId);
  const imgPath = req.files.length > 0 ? req.files[0].path : "";
  const doctor = await Doctor.findById(userId);
  if (!doctor) throw new HttpError("User Not Found", 404);
  const newBlog = new Blog({
    blogTitle: blogTitle,
    blogBody: blogBody,
    blogCategory: blogCategory,
    authorName: user.name,
    doctorId: userId,
    photo: imgPath,
    upvotes: [],
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await newBlog.save({ session: session });
  doctor.blogs.push(newBlog);
  await doctor.save({ session: session });
  await session.commitTransaction();
  res.status(201).json({
    message: "successful",
    data: {
      newBlog,
    },
  });
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  let { category, sortBy } = req.query;

  let filteredBlogs;
  let filteredBlogsSorted;

  const blogs = await Blog.find().populate("commentId");

  if (!category) {
    filteredBlogs = blogs;
  } else {
    filteredBlogs = blogs.filter((blog) => {
      return blog.blogCategory === category;
    });
  }

  if (!sortBy) {
    sortBy = "dateDesc";
  }

  if (sortBy === "upvotesAsc") {
    filteredBlogsSorted = filteredBlogs.sort((a, b) => {
      return a.upvotes.length - b.upvotes.length;
    });
  } else if (sortBy === "upvotesDesc") {
    filteredBlogsSorted = filteredBlogs.sort((a, b) => {
      return b.upvotes.length - a.upvotes.length;
    });
  } else if (sortBy === `dateAsc`) {
    filteredBlogsSorted = filteredBlogs.sort((a, b) => {
      return Number(a.createdAt) - Number(b.createdAt);
    });
  } else if (sortBy === `dateDesc`) {
    filteredBlogsSorted = filteredBlogs.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });
  }
  filteredBlogs = filteredBlogsSorted;
  res.status(200).json({
    message: "successful",
    No_of_blogs: blogs.length,
    data: {
      filteredBlogs,
    },
  });
});

exports.getBlogsOfUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (req.userData.type !== "doctor") {
    throw new HttpError("Unauthorized", 401);
  }
  const user = await Doctor.findById(id).populate("blogs");
  res.status(200).json({
    message: "successful",
    data: {
      blogs: user.blogs.map((id) => id.toObject({ getters: true })),
    },
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("commentId");
  if (!blog) throw new HttpError("Blog Not Found", 404);
  res.status(200).json({
    message: "successful",
    data: {
      blog,
    },
  });
});

exports.commentBlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const { comment } = req.body;
  if (req.userData.type !== "patient") throw new AppError("Unauthorized", 400);
  const blog = await Blog.findById(blogId);
  if (!blog) throw new HttpError("Blog Not Found", 404);
  const newComment = new Comment({
    blogId: blogId,
    comment: comment,
    commentedBy: req.userData.id,
    name: req.userData.name,
    upvotes: [],
  });
  const session = await mongoose.startSession();
  session.startTransaction();
  await newComment.save({ session: session });
  blog.commentId.push(newComment);
  await blog.save({ session: session });
  await session.commitTransaction();
  res.status(201).json({
    message: "successful",
    data: {
      newComment,
    },
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("commentId");
  res.status(200).json({
    message: "successful",
    data: {
      comments: blog.commentId.map((id) => id.toObject({ getters: true })),
    },
  });
});

exports.upvoteBlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const id = req.userData.id;
  const blog = await Blog.findById(blogId);
  const isUpvoted = blog.upvotes && blog.upvotes.includes(id);
  const option = isUpvoted ? "$pull" : "$addToSet";
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      [option]: { upvotes: id },
    },
    { new: true }
  );
  res.status(201).json({
    message: "success",
    data: {
      blog: updatedBlog,
    },
  });
});
