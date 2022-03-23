import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getPatientAppointments } from "../../actions/appointmentActions";
import {
  DELETE_APPOINTMENTS,
  SEND_APPOINTMENT_PRESCRIPTION,
} from "../../constants/apiLinks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppointmentItem from "./AppointmentItem";

function UserAppointments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valueMissing, setValueMissing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [tests, setTests] = useState("");
  const [advice, setAdvice] = useState("");

  const [appointmentPrescriptionId, setAppointmentPrescriptionId] =
    useState("");

  const { loading, error, appointments } = useSelector(
    (state) => state.patientAppointmentList
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(getPatientAppointments());
  }, [dispatch]);

  const handleMakePrescriptionClick = (id) => {
    setAppointmentPrescriptionId(id);
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handlePrescriptionPost = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if (diagnosis || tests || advice) {
      try {
        const res = await axios.patch(
          `${SEND_APPOINTMENT_PRESCRIPTION}/${appointmentPrescriptionId}`,
          { diagnosis, tests, advice },
          config
        );

        setShowDialog(false);
        setValueMissing(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setValueMissing(true);
    }
  };

  return (
    <Stack spacing={4} alignItems={"center"}>
      {appointments.length > 0 &&
        appointments.map((item, index) => (
          <AppointmentItem
            key={index}
            item={item}
            userInfo={userInfo}
            handleMakePrescriptionClick={handleMakePrescriptionClick}
          />
        ))}

      <Dialog fullWidth open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>Create Prescription</DialogTitle>

        <DialogContent>
          <Stack spacing={4} py={1}>
            {valueMissing && (
              <Alert severity="error">At least one field must be filled</Alert>
            )}

            <TextField
              multiline
              minRows={2}
              variant="outlined"
              label="Diagnosis"
              onChange={(e) => setDiagnosis(e.target.value)}
              defaultValue=""
            />

            <TextField
              multiline
              minRows={2}
              variant="outlined"
              label="Give Test"
              onChange={(e) => setTests(e.target.value)}
              defaultValue=""
            />

            <TextField
              multiline
              minRows={2}
              variant="outlined"
              label="Advices & Medicines"
              onChange={(e) => setAdvice(e.target.value)}
              defaultValue=""
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePrescriptionPost}>Send</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default UserAppointments;
