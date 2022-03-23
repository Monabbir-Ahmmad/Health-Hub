import { Alert, Box, Drawer, Grid, LinearProgress, Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import DoctorItem from "./DoctorItem";
import DoctorSearchBar from "./DoctorSearchBar";
import SetAppointment from "./SetAppointment";

function FindDoctor() {
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      !(
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      )
    ) {
      setDrawerOpen(open);
    }
  };

  const { loading, error, doctors } = useSelector((state) => state.doctorList);

  const onItemClick = (doctor) => {
    setSelectedDoctor(doctor);
    setDrawerOpen(true);
  };

  return (
    <Stack spacing={4} px={4}>
      <DoctorSearchBar />

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}>
        {doctors.map((item, index) => (
          <Grid item xs={1} key={index}>
            <DoctorItem item={item} onItemClick={onItemClick} />
          </Grid>
        ))}
      </Grid>

      <Drawer anchor={"right"} open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box p={5} role="presentation" sx={{ width: "40vw" }}>
          <SetAppointment selectedDoctor={selectedDoctor} />
        </Box>
      </Drawer>
    </Stack>
  );
}

export default FindDoctor;
