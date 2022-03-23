import axios from "axios";
import {
  GET_BLOG_COMMENTS,
  GET_BLOG_LIST,
  GET_PERSONAL_BLOGS,
  GET_SINGLE_BLOG,
  POST_BLOG,
  POST_BLOG_COMMENT,
} from "../constants/apiLinks";
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
import {
  GET_PERSONAL_QUESTIONS_FAIL,
  GET_PERSONAL_QUESTIONS_REQUEST,
  GET_PERSONAL_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_SINGLE_QUESTION_FAIL,
  GET_SINGLE_QUESTION_REQUEST,
  GET_SINGLE_QUESTION_SUCCESS,
  POST_ANSWER_FAIL,
  POST_ANSWER_REQUEST,
  POST_ANSWER_SUCCESS,
  POST_QUESTION_FAIL,
  POST_QUESTION_REQUEST,
  POST_QUESTION_SUCCESS,
} from "../constants/queAnsConstants";

export const writeBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_BLOG_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post(`${POST_BLOG}`, blog, config);

    dispatch({
      type: POST_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBlogList = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BLOGS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(
      `${GET_BLOG_LIST}?category=${filter.category}&sortBy=${filter.sortBy}`,
      config
    );

    dispatch({
      type: GET_BLOGS_SUCCESS,
      payload: res.data.data.filteredBlogs,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SINGLE_BLOG_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${GET_SINGLE_BLOG}/${id}`, config);

    dispatch({
      type: GET_SINGLE_BLOG_SUCCESS,
      payload: res.data.data.blog,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_BLOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postBlogComment =
  (blogId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_BLOG_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.post(
        `${POST_BLOG_COMMENT}/${blogId}`,
        { comment },
        config
      );

      dispatch({
        type: POST_BLOG_COMMENT_SUCCESS,
        payload: res.data.data.newComment,
      });

      const {
        singleBlogComments: { blogComments },
      } = getState();

      dispatch({
        type: GET_BLOG_COMMENTS_SUCCESS,
        payload: [...blogComments, res.data.data.newComment],
      });
    } catch (error) {
      dispatch({
        type: POST_BLOG_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPersonalBlogs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PERSONAL_BLOGS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${GET_PERSONAL_BLOGS}/${userInfo.id}`, config);

    dispatch({
      type: GET_PERSONAL_BLOGS_SUCCESS,
      payload: res.data.data.blogs,
    });
  } catch (error) {
    dispatch({
      type: GET_PERSONAL_BLOGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBlogComments = (blogId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BLOG_COMMENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${GET_BLOG_COMMENTS}/${blogId}`, config);

    dispatch({
      type: GET_BLOG_COMMENTS_SUCCESS,
      payload: res.data.data.comments,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOG_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
