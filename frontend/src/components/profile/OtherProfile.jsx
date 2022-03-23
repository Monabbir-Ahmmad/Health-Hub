import {
  Alert,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../actions/userActions";

function OtherProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    medicalId: "",
    specializations: [],
    workplaces: [],
    qualifications: [],
  });

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length) {
      if (!(user && Object.keys(user).length)) {
        dispatch(getUserDetails());
      } else {
        setValues({ ...user });
      }
    } else {
      navigate("/sign-in");
    }
  }, [dispatch, navigate, user, userInfo]);

  return (
    <Stack>
      <Grid container spacing={4} columns={{ xs: 1 }} maxWidth={"800px"}>
        <Grid item xs={2}>
          <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
            Other Info
          </Typography>
        </Grid>

        {loading && (
          <Grid item xs={2}>
            <LinearProgress />
          </Grid>
        )}

        {error && (
          <Grid item xs={2}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        <Grid item xs={1}>
          <Typography variant="h6">
            Medical Reg.No: {values.medicalId}
          </Typography>
        </Grid>

        <Grid item xs={1}>
          <Typography variant="h6">Specializations</Typography>
          {values.specializations.map((text, i) => (
            <Chip
              key={i}
              label={text}
              variant="outlined"
              color="primary"
              sx={{ mr: 1, mt: 2, fontSize: "1rem" }}
            />
          ))}
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">Qualifications</Typography>
          {values.qualifications.map((text, i) => (
            <Chip
              key={i}
              label={text}
              variant="outlined"
              color="primary"
              sx={{ mr: 1, mt: 2, fontSize: "1rem" }}
            />
          ))}
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h6">Workplaces</Typography>

          {values.workplaces.map((text, i) => (
            <Chip
              key={i}
              label={text}
              variant="outlined"
              color="primary"
              sx={{ mr: 1, mt: 2, fontSize: "1rem" }}
            />
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default OtherProfile;
