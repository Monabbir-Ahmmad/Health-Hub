import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { genders } from "../../utils/categoryList";

const StyledTextField = styled(TextField)`
  & label.Mui-disabled,
  input.Mui-disabled,
  div.Mui-disabled {
    -webkit-text-fill-color: black;
  }
`;

const StyledForm = styled.form`
  display: flex;

  @media (max-width: 900px) {
    align-item: center;
    justify-content: center;
  }
`;

function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inEditMode, setEditMode] = useState(false);

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, user } = useSelector((state) => state.userDetails);

  const { success, error } = useSelector((state) => state.userProfileUpdate);

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

  useEffect(() => {
    if (success) {
      resetEditMode();
      dispatch(getUserDetails());
    }
  }, [dispatch, success]);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value, isAdmin: true });
  };

  const handleClickShowPassword = (prop) => (e) => {
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  const resetEditMode = (e) => {
    setEditMode(!inEditMode);
    setValueMissing(false);
    setShowPassword({
      ...Object.keys(showPassword).every((key) => (showPassword[key] = false)),
    });
    setValues({
      ...user,
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(values).every((key) => values[key]) &&
      values.password === values.confirmPassword
    ) {
      setValueMissing(true);
      dispatch(
        updateUserProfile({
          ...values,
        })
      );
    } else {
      setValueMissing(true);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Grid container spacing={4} columns={{ xs: 1, sm: 2 }} maxWidth={"800px"}>
        <Grid item xs={2}>
          <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
            Account settings
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

        {success && (
          <Grid item xs={2}>
            <Alert severity="success">Update successful</Alert>
          </Grid>
        )}

        <Grid item xs={2}>
          <StyledTextField
            fullWidth
            variant={inEditMode ? "outlined" : "standard"}
            disabled={!inEditMode}
            label="Name"
            type={"text"}
            error={valueMissing && !values.name}
            helperText={
              valueMissing && !values.name ? "Please enter your name" : ""
            }
            value={values.name}
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={1}>
          <StyledTextField
            fullWidth
            variant={inEditMode ? "outlined" : "standard"}
            disabled={!inEditMode}
            label="Email"
            type={"email"}
            error={valueMissing && !values.email}
            helperText={
              valueMissing && !values.email ? "Please enter your email" : ""
            }
            value={values.email}
            onChange={handleChange("email")}
          />
        </Grid>

        <Grid item xs={1}>
          <StyledTextField
            fullWidth
            select
            variant={inEditMode ? "outlined" : "standard"}
            disabled={!inEditMode}
            label="Gender"
            error={valueMissing && !values.gender}
            helperText={
              valueMissing && !values.gender ? "Please select your gender" : ""
            }
            sx={{
              svg: { display: !inEditMode && "none" },
            }}
            value={values.gender}
            onChange={handleChange("gender")}
          >
            {genders.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </StyledTextField>
        </Grid>

        <Grid item xs={1}>
          <StyledTextField
            fullWidth
            variant={inEditMode ? "outlined" : "standard"}
            disabled={!inEditMode}
            label="Phone Number"
            type={"tel"}
            error={valueMissing && !values.phoneNo}
            helperText={
              valueMissing && !values.phoneNo
                ? "Please enter your phone number"
                : ""
            }
            value={values.phoneNo}
            onChange={handleChange("phoneNo")}
          />
        </Grid>

        {userInfo.role === "user" && (
          <Grid item xs={1}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                disableFuture
                disabled={!inEditMode}
                label="Date of Birth"
                value={values.dateOfBirth}
                onChange={(newValue) =>
                  setValues({ ...values, dateOfBirth: newValue })
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    variant={inEditMode ? "outlined" : "standard"}
                    error={valueMissing && !values.dateOfBirth}
                    helperText={
                      valueMissing && !values.dateOfBirth
                        ? "Please enter your date of birth"
                        : ""
                    }
                    sx={{
                      svg: { display: !inEditMode && "none" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        )}

        {inEditMode && (
          <Grid item xs={1}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword.password ? "text" : "password"}
              error={valueMissing && !values.password}
              helperText={
                valueMissing && !values.password
                  ? "Please enter your password"
                  : ""
              }
              value={values.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword("password")}>
                      {showPassword.password ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}

        {inEditMode && (
          <Grid item xs={1}>
            <TextField
              fullWidth
              variant="outlined"
              label="Confirm Password"
              type={showPassword.confirmPassword ? "text" : "password"}
              error={
                valueMissing &&
                (!values.confirmPassword ||
                  values.password !== values.confirmPassword)
              }
              helperText={
                valueMissing &&
                (!values.confirmPassword ||
                  values.password !== values.confirmPassword)
                  ? "Please confirm your password"
                  : ""
              }
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword("confirmPassword")}
                    >
                      {showPassword.confirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}

        <Grid item xs={2}>
          <Stack spacing={2} direction={"row"}>
            {inEditMode && (
              <Button variant="contained" type="submit">
                Confirm
              </Button>
            )}
            <Button variant="outlined" onClick={resetEditMode}>
              {inEditMode ? "Cancel" : "Edit"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </StyledForm>
  );
}

export default UpdateProfile;
