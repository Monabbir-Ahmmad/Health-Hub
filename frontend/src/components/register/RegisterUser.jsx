import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import { genders } from "../../utils/categoryList";

const StyledLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

function RegisterUser() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleClickShowPassword = (prop) => (e) => {
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  const onFileSelect = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name,
      email,
      image: profilePic,
      gender,
      dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
      phoneNo: phone,
      password,
    };

    if (
      name &&
      email &&
      password &&
      profilePic &&
      confirmPassword &&
      gender &&
      dateOfBirth &&
      phone &&
      password === confirmPassword
    ) {
      setValueMissing(false);

      const formData = new FormData();

      Object.keys(values).forEach((item) => {
        formData.append([item], values[item]);
      });

      dispatch(register("user", formData));
    } else {
      setValueMissing(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {loading && <LinearProgress />}

        {error && <Alert severity="error">{error}</Alert>}

        <Avatar
          alt="Profile Picture"
          src={profilePic && URL.createObjectURL(profilePic)}
          sx={{ width: 150, height: 150, alignSelf: "center" }}
        />

        <label htmlFor="contained-button-file">
          <Input
            id="contained-button-file"
            type={"file"}
            name="profilePic"
            accept=".png, .jpg, .jpeg"
            onChange={onFileSelect}
            sx={{ display: "none" }}
          />
          <Button
            fullWidth
            variant="outlined"
            component="span"
            color={valueMissing && !profilePic ? "error" : "primary"}
          >
            Upload Your Picture
          </Button>
        </label>

        <TextField
          variant="outlined"
          label="Full Name"
          type={"text"}
          error={valueMissing && !name}
          helperText={
            valueMissing && !name ? "Please enter your full name" : ""
          }
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          variant="outlined"
          label="Email"
          type={"email"}
          error={valueMissing && !email}
          helperText={valueMissing && !email ? "Please enter your email" : ""}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          variant="outlined"
          label="Phone"
          type={"tel"}
          error={valueMissing && !phone}
          helperText={valueMissing && !phone ? "Please enter your phone" : ""}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          variant="outlined"
          label="Gender"
          select
          error={valueMissing && !gender}
          helperText={
            valueMissing && !gender ? "Please select your gender" : ""
          }
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          {genders.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            disableFuture
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(newValue) => setDateOfBirth(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                error={valueMissing && !dateOfBirth}
                helperText={
                  valueMissing && !dateOfBirth
                    ? "Please enter your date of birth"
                    : ""
                }
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          variant="outlined"
          label="Password"
          type={showPassword.password ? "text" : "password"}
          error={valueMissing && !password}
          helperText={
            valueMissing && !password ? "Please enter your password" : ""
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword("password")}>
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          label="Confirm Password"
          type={showPassword.confirmPassword ? "text" : "password"}
          error={
            valueMissing && (!confirmPassword || password !== confirmPassword)
          }
          helperText={
            valueMissing && (!confirmPassword || password !== confirmPassword)
              ? "Please confirm your password"
              : ""
          }
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <Button variant="contained" size="large" type="submit">
          Create account
        </Button>

        {loading && <CircularProgress sx={{ alignSelf: "center" }} />}

        <Typography variant="body1" color={"primary"}>
          Already have an account?{" "}
          <StyledLink to="/sign-in">Sign In</StyledLink>
        </Typography>
      </Stack>
    </form>
  );
}

export default RegisterUser;
