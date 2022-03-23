import { SearchOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { doctorList } from "../../actions/appointmentActions";
import { specializationList } from "../../utils/categoryList";

function DoctorSearchBar() {
  const dispatch = useDispatch();

  const [doctorName, setDoctorName] = useState("");
  const [speciality, setSpeciality] = useState("");

  useEffect(() => {
    dispatch(doctorList(doctorName, speciality));
  }, []);

  const handleSearchClick = () => {
    dispatch(doctorList(doctorName, speciality));
  };

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: "1000px",
        alignSelf: "center",
        borderRadius: "100px",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">Search</Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Doctor's Name"
          type={"text"}
          size="small"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />

        <Autocomplete
          fullWidth
          options={specializationList}
          getOptionLabel={(option) => option}
          onChange={(e, values) => {
            setSpeciality(values ? values : "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Specialization"
              size="small"
            />
          )}
        />

        <IconButton color="primary" onClick={handleSearchClick} size="large">
          <SearchOutlined />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default DoctorSearchBar;
