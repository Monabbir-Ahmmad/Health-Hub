import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  API_HOST,
  GET_DOCTOR_AVAILABLE_APPOINTMENTS,
  POST_APPOINTMENTS,
} from "../../constants/apiLinks";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../actions/userActions";

function SetAppointment({ selectedDoctor }) {
  const dispatch = useDispatch();

  const [valueMissing, setValueMissing] = useState(false);
  const [openAppointment, setOpenAppointment] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, user } = useSelector((state) => state.userDetails);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const handleDialogClose = () => {
    setAppointmentDate("");
    setAppointmentTime("");
    setAvailableTimeSlots([]);
    setOpenAppointment(false);
  };

  const handleDateChange = async (newValue) => {
    if (newValue) {
      try {
        const res = await axios.post(
          `${GET_DOCTOR_AVAILABLE_APPOINTMENTS}`,
          {
            doctorId: selectedDoctor._id,
            date: moment(newValue).format("YYYY-MM-DD"),
            timestamp: moment(newValue).valueOf(),
          },
          config
        );

        setAvailableTimeSlots(res.data.times);
        setAppointmentTime("");
      } catch (error) {
        console.log(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
    setAppointmentDate(newValue);
  };

  const handleSetAppointment = async () => {
    if (appointmentDate && appointmentTime) {
      try {
        const res = await axios.post(
          `${POST_APPOINTMENTS}`,
          {
            doctorId: selectedDoctor._id,
            patientId: userInfo.id,
            doctorName: selectedDoctor.name,
            doctorProfileImage: selectedDoctor.profileImage,
            patientName: user.name,
            email: selectedDoctor.email,
            phoneNo: selectedDoctor.phoneNo,
            date: moment(appointmentDate).format("YYYY-MM-DD"),
            time: appointmentTime,
          },
          config
        );

        handleDialogClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      setValueMissing(true);
    }
  };

  return (
    <Stack spacing={5}>
      <Stack
        spacing={5}
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
      >
        <Avatar
          alt="Profile Picture"
          src={`${API_HOST}/${selectedDoctor.profileImage}`}
          sx={{ width: 300, height: 300 }}
        />
        <Stack
          spacing={2}
          alignSelf={{ xs: "start", md: "center" }}
          divider={<Divider />}
        >
          <Typography variant="h6">Name: {selectedDoctor.name}</Typography>
          <Typography variant="h6">Email: {selectedDoctor.email}</Typography>
          <Typography variant="h6">
            Phone Number: {selectedDoctor.phoneNo}
          </Typography>
          <Typography variant="h6">Gender: {selectedDoctor.gender}</Typography>
          <Typography variant="h6">
            Medical Rge.No: {selectedDoctor.medicalId}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        spacing={2}
        border="1px solid #6f6f6f"
        borderRadius={2}
        p={2}
        divider={<Divider />}
      >
        <Typography variant="h6">
          Qualifications:
          {selectedDoctor.qualifications.map((text, i) => (
            <Chip
              key={i}
              label={text}
              variant="outlined"
              sx={{ m: 1, fontSize: "1rem" }}
            />
          ))}
        </Typography>

        <Typography variant="h6">
          Specializations:
          {selectedDoctor.specializations.map((text, i) => (
            <Chip
              key={i}
              label={text}
              variant="outlined"
              sx={{ m: 1, fontSize: "1rem" }}
            />
          ))}
        </Typography>

        <Typography variant="h6">
          Workplaces:
          {selectedDoctor.workplaces.map((text, i) => (
            <Chip
              key={i}
              label={text}
              variant="outlined"
              sx={{ m: 1, fontSize: "1rem" }}
            />
          ))}
        </Typography>
      </Stack>

      <Dialog fullWidth open={openAppointment} onClose={handleDialogClose}>
        <DialogTitle>Pick Appointment</DialogTitle>

        <DialogContent>
          <Stack spacing={4} py={1}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <StaticDatePicker
                orientation="landscape"
                openTo="day"
                disablePast
                value={appointmentDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={valueMissing && !appointmentDate}
                    helperText={
                      valueMissing && !appointmentDate
                        ? "Please pick an appointment date"
                        : ""
                    }
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              variant="outlined"
              label="Available Time Slots"
              select
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              error={valueMissing && !appointmentTime}
              helperText={
                valueMissing && !appointmentTime
                  ? "Please pick an appointment time"
                  : ""
              }
            >
              {availableTimeSlots.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSetAppointment}>Set Appointment</Button>
        </DialogActions>
      </Dialog>

      {userInfo.role === "user" && (
        <Button
          variant="contained"
          onClick={(e) => setOpenAppointment(!openAppointment)}
        >
          Pick Appointment
        </Button>
      )}
    </Stack>
  );
}

export default SetAppointment;
