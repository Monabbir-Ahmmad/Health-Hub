import { TabContext, TabPanel } from "@mui/lab";
import { Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegisterDoctor from "../components/register/RegisterDoctor";
import RegisterUser from "../components/register/RegisterUser";

function RegisterPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const [tabValue, setTabValue] = useState("user");

  const handleTabChange = (e, newValue) => {
    navigate(`/sign-up?type=${newValue}`);
  };

  useEffect(() => {
    setTabValue(type ? type : "user");
  }, [type]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <TabContext value={tabValue}>
        <Paper
          variant="outlined"
          sx={{ m: 5, p: 5, maxWidth: "500px", flex: 1 }}
        >
          <Stack spacing={5}>
            <Typography
              variant="h4"
              sx={{ textTransform: "uppercase" }}
              color="primary"
              textAlign={"center"}
            >
              Sign up
            </Typography>
            <Tabs
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="User Account" value="user" />
              <Tab label="Doctor Account" value="doctor" />
            </Tabs>

            <TabPanel value={"user"} sx={{ p: 0 }}>
              <RegisterUser />
            </TabPanel>
            <TabPanel value={"doctor"} sx={{ p: 0 }}>
              <RegisterDoctor />
            </TabPanel>
          </Stack>
        </Paper>
      </TabContext>
    </Box>
  );
}

export default RegisterPage;
