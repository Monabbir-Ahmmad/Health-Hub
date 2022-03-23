import { io } from "socket.io-client";
import { API_HOST } from "../constants/apiLinks";
import {
  SOCKET_CONNECTION_FAIL,
  SOCKET_CONNECTION_REQUEST,
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_DISCONNECT,
} from "../constants/socketConstants";

export const createSocketConnection = () => (dispatch) => {
  try {
    dispatch({ type: SOCKET_CONNECTION_REQUEST });

    const socket = io.connect(API_HOST);

    dispatch({
      type: SOCKET_CONNECTION_SUCCESS,
      payload: socket,
    });
  } catch (error) {
    dispatch({
      type: SOCKET_CONNECTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const disconnectSocket = () => (dispatch) => {
  dispatch({ type: SOCKET_DISCONNECT });
};
