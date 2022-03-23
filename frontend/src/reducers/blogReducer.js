import {
  GET_BLOGS_FAIL,
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOG_COMMENTS_FAIL,
  GET_BLOG_COMMENTS_REQUEST,
  GET_BLOG_COMMENTS_SUCCESS,
  GET_PERSONAL_BLOGS_FAIL,
  GET_PERSONAL_BLOGS_REQUEST,
  GET_PERSONAL_BLOGS_SUCCESS,
  GET_SINGLE_BLOG_FAIL,
  GET_SINGLE_BLOG_REQUEST,
  GET_SINGLE_BLOG_SUCCESS,
  POST_BLOG_COMMENT_FAIL,
  POST_BLOG_COMMENT_REQUEST,
  POST_BLOG_COMMENT_SUCCESS,
  POST_BLOG_FAIL,
  POST_BLOG_REQUEST,
  POST_BLOG_SUCCESS,
} from "../constants/blogsConstants";

export const postBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BLOG_REQUEST:
      return { loading: true };
    case POST_BLOG_SUCCESS:
      return { loading: false, success: true, blogs: action.payload };
    case POST_BLOG_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return { loading: true, blogs: [] };
    case GET_BLOGS_SUCCESS:
      return { loading: false, blogs: action.payload };
    case GET_BLOGS_FAIL:
      return { loading: false, blogs: [], error: action.payload };
    default:
      return state;
  }
};

export const singleBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_BLOG_REQUEST:
      return { loading: true };
    case GET_SINGLE_BLOG_SUCCESS:
      return { loading: false, blog: action.payload };
    case GET_SINGLE_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleBlogCommentsReducer = (
  state = { blogComments: [] },
  action
) => {
  switch (action.type) {
    case GET_BLOG_COMMENTS_REQUEST:
      return { loading: true, blogComments: [] };
    case GET_BLOG_COMMENTS_SUCCESS:
      return { loading: false, blogComments: action.payload };
    case GET_BLOG_COMMENTS_FAIL:
      return { loading: false, blogComments: [], error: action.payload };
    default:
      return state;
  }
};

export const writeBlogCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BLOG_COMMENT_REQUEST:
      return { loading: true };
    case POST_BLOG_COMMENT_SUCCESS:
      return { loading: false, success: true, blogComment: action.payload };
    case POST_BLOG_COMMENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const personalBlogsReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case GET_PERSONAL_BLOGS_REQUEST:
      return { loading: true, blogs: [] };
    case GET_PERSONAL_BLOGS_SUCCESS:
      return { loading: false, blogs: action.payload };
    case GET_PERSONAL_BLOGS_FAIL:
      return { loading: false, blogs: [], error: action.payload };
    default:
      return state;
  }
};
