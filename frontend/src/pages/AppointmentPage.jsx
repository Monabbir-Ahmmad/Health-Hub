import { TabContext, TabPanel } from "@mui/lab";
import { Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FindDoctor from "../components/appointment/FindDoctor";
import UserAppointments from "../components/appointment/UserAppointments";

function AppointmentPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const type = searchParams.get("tab");

  const [tabValue, setTabValue] = useState("find-doctor");

  const handleTabChange = (e, newValue) => {
    navigate(`/appointments?tab=${newValue}`);
  };

  useEffect(() => {
    setTabValue(type ? type : "find-doctor");
  }, [type]);

  return (
    <TabContext value={tabValue}>
      <Stack spacing={5}>
        <Tabs
          variant="fullWidth"
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            borderBottom: 1,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "#fff",
          }}
        >
          <Tab label="Find Doctors" value="find-doctor" />
          <Tab label="Your Appointments" value="your-appointments" />
        </Tabs>

        <TabPanel value={"find-doctor"} sx={{ p: 0 }}>
          <FindDoctor />
        </TabPanel>
        <TabPanel value={"your-appointments"} sx={{ p: 0 }}>
          <UserAppointments />
        </TabPanel>
      </Stack>
    </TabContext>
  );
}

export default AppointmentPage;
