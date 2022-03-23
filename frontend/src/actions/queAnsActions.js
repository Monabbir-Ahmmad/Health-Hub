import axios from "axios";
import {
  GET_PERSONAL_QUESTIONS,
  GET_QUESTION_LIST,
  GET_SINGLE_QUESTION,
  POST_ANSWER,
  POST_QUESTION,
} from "../constants/apiLinks";
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

export const postQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_QUESTION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const queBody = {
      questionTitle: question.questionTitle,
      questionBody: question.questionBody,
      questionCategory: question.questionCategory,
      askedBy: question.anonymous ? "" : userInfo.name,
    };

    const res = await axios.post(`${POST_QUESTION}`, queBody, config);

    const {
      questionList: { questions },
    } = getState();

    dispatch({
      type: POST_QUESTION_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: GET_QUESTIONS_SUCCESS,
      payload: [...questions, res.data.data.newQuestion],
    });

    dispatch(getPersonalQuestions());
  } catch (error) {
    dispatch({
      type: POST_QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getQuestionList = (filter) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_QUESTIONS_REQUEST });

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
      `${GET_QUESTION_LIST}?category=${filter.category}&sortBy=${filter.sortBy}`,
      config
    );

    dispatch({
      type: GET_QUESTIONS_SUCCESS,
      payload: res.data.data.questions,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleQuestion = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SINGLE_QUESTION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${GET_SINGLE_QUESTION}/${id}`, config);

    dispatch({
      type: GET_SINGLE_QUESTION_SUCCESS,
      payload: res.data.data.question,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postAnswer =
  (questionId, answer) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_ANSWER_REQUEST });

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
        `${POST_ANSWER}/${questionId}`,
        { answer },
        config
      );

      dispatch({
        type: POST_ANSWER_SUCCESS,
        payload: res.data.data.newAnswer,
      });

      const {
        singleQuestion: { question },
      } = getState();

      dispatch({
        type: GET_SINGLE_QUESTION_SUCCESS,
        payload: {
          ...question,
          _answersId: [...question._answersId, res.data.data.newAnswer],
        },
      });
    } catch (error) {
      dispatch({
        type: POST_ANSWER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPersonalQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PERSONAL_QUESTIONS_REQUEST });

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
      `${GET_PERSONAL_QUESTIONS}/${userInfo.id}`,
      config
    );

    dispatch({
      type: GET_PERSONAL_QUESTIONS_SUCCESS,
      payload: res.data.data.questions,
    });
  } catch (error) {
    dispatch({
      type: GET_PERSONAL_QUESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
