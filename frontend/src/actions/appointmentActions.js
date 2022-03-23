import axios from "axios";
import {
  GET_DOCTOR_APPOINTMENTS,
  GET_DOCTOR_LIST,
  GET_PATIENT_APPOINTMENTS,
} from "../constants/apiLinks";
import {
  FIND_DOCTOR_FAIL,
  FIND_DOCTOR_REQUEST,
  FIND_DOCTOR_SUCCESS,
  GET_PATIENT_APPOINTMENTS_FAIL,
  GET_PATIENT_APPOINTMENTS_REQUEST,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
} from "../constants/appointmentConstants";

export const doctorList =
  (doctorName, speciality) => async (dispatch, getState) => {
    try {
      dispatch({ type: FIND_DOCTOR_REQUEST });

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
        `${GET_DOCTOR_LIST}/?doctorName=${doctorName}&speciality=${speciality}`,
        config
      );

      dispatch({
        type: FIND_DOCTOR_SUCCESS,
        payload: res.data.doctors,
      });
    } catch (error) {
      dispatch({
        type: FIND_DOCTOR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPatientAppointments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PATIENT_APPOINTMENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const reqLink =
      userInfo.role === "user"
        ? GET_PATIENT_APPOINTMENTS
        : GET_DOCTOR_APPOINTMENTS;

    const res = await axios.get(`${reqLink}`, config);


    if (userInfo.role === "user") {
      dispatch({
        type: GET_PATIENT_APPOINTMENTS_SUCCESS,
        payload: res.data.data.appointments,
      });
    } else {
      dispatch({
        type: GET_PATIENT_APPOINTMENTS_SUCCESS,
        payload: res.data.data.appointments,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_PATIENT_APPOINTMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
