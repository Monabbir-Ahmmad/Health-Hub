import {
  FIND_DOCTOR_FAIL,
  FIND_DOCTOR_REQUEST,
  FIND_DOCTOR_SUCCESS,
  GET_PATIENT_APPOINTMENTS_FAIL,
  GET_PATIENT_APPOINTMENTS_REQUEST,
  GET_PATIENT_APPOINTMENTS_SUCCESS,
} from "../constants/appointmentConstants";

export const doctorListReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case FIND_DOCTOR_REQUEST:
      return { loading: true, doctors: [] };
    case FIND_DOCTOR_SUCCESS:
      return { loading: false, doctors: action.payload };
    case FIND_DOCTOR_FAIL:
      return { loading: false, doctors: [], error: action.payload };
    default:
      return state;
  }
};

export const patientAppointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case GET_PATIENT_APPOINTMENTS_REQUEST:
      return { loading: true, appointments: [] };
    case GET_PATIENT_APPOINTMENTS_SUCCESS:
      return { loading: false, appointments: action.payload };
    case GET_PATIENT_APPOINTMENTS_FAIL:
      return { loading: false, appointments: [], error: action.payload };
    default:
      return state;
  }
};
