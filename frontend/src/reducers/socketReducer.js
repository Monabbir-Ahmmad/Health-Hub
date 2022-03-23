import {
  SOCKET_CONNECTION_FAIL,
  SOCKET_CONNECTION_REQUEST,
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_DISCONNECT,
} from "../constants/socketConstants";

export const socketConnectionReducer = (state = {}, action) => {
  switch (action.type) {
    case SOCKET_CONNECTION_REQUEST:
      return { loading: true };
    case SOCKET_CONNECTION_SUCCESS:
      return { loading: false, socket: action.payload };
    case SOCKET_CONNECTION_FAIL:
      return { loading: false, error: action.payload };
    case SOCKET_DISCONNECT:
      return {};
    default:
      return state;
  }
};
