import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  Chip,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import { genders, specializationList } from "../../utils/categoryList";

const StyledLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

function RegisterDoctor() {
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
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalId, setMedicalId] = useState("");
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);
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

  const onProfilePicSelect = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const onLicenseFrontSelect = (e) => {
    if (e.target.files[0]) {
      setLicenseFront(e.target.files[0]);
    }
  };

  const onLicenseBackSelect = (e) => {
    if (e.target.files[0]) {
      setLicenseBack(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name,
      email,
      gender,
      phoneNo: phone,
      password,
      medicalId,
    };

    if (
      name &&
      email &&
      gender &&
      phone &&
      medicalId &&
      profilePic &&
      licenseFront &&
      licenseBack &&
      specializations.length &&
      qualifications.length &&
      workplaces.length &&
      password &&
      password === confirmPassword
    ) {
      setValueMissing(false);

      const formData = new FormData();

      Object.keys(values).forEach((item) => {
        formData.append([item], values[item]);
      });

      formData.append("image", profilePic);
      formData.append("image", licenseFront);
      formData.append("image", licenseBack);
      formData.append("specializations", JSON.stringify(specializations));
      formData.append("qualifications", JSON.stringify(qualifications));
      formData.append("workplaces", JSON.stringify(workplaces));

      dispatch(register("doctor", formData));
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
            onChange={onProfilePicSelect}
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
          helperText={valueMissing && !name ? "Please enter your name" : ""}
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

        <TextField
          variant="outlined"
          label="Medical Reg.No"
          type={"text"}
          error={valueMissing && !medicalId}
          helperText={
            valueMissing && !medicalId
              ? "Please enter your medical registration number"
              : ""
          }
          value={medicalId}
          onChange={(e) => setMedicalId(e.target.value)}
        />

        <TextField
          variant="outlined"
          name="licenseFront"
          label="Medical Certificate (Front)"
          type={"file"}
          error={valueMissing && !licenseFront}
          helperText={
            valueMissing && !licenseFront
              ? "Please upload your medical certificate"
              : ""
          }
          onChange={onLicenseFrontSelect}
          inputProps={{ accept: ".png, .jpg, .jpeg" }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          name="licenseBack"
          label="Medical Certificate (Back)"
          type={"file"}
          error={valueMissing && !licenseBack}
          helperText={
            valueMissing && !licenseBack
              ? "Please upload your medical certificate"
              : ""
          }
          onChange={onLicenseBackSelect}
          inputProps={{ accept: ".png, .jpg, .jpeg" }}
          InputLabelProps={{ shrink: true }}
        />

        <Autocomplete
          multiple
          options={specializationList}
          getOptionLabel={(option) => option}
          onChange={(e, values) => setSpecializations(values)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Specializations"
              error={valueMissing && !specializations.length}
              helperText={
                valueMissing && !specializations.length
                  ? "Please set your specializations"
                  : ""
              }
            />
          )}
        />

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          onChange={(e, values) => setQualifications(values)}
          renderTags={(values, getTagProps) =>
            values.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Qualifications"
              placeholder="Add new (ENTER)"
              error={valueMissing && !qualifications.length}
              helperText={
                valueMissing && !qualifications.length
                  ? "Please enter your qualifications"
                  : ""
              }
            />
          )}
        />

        <Autocomplete
          multiple
          freeSolo
          options={[]}
          onChange={(e, values) => setWorkplaces(values)}
          renderTags={(values, getTagProps) =>
            values.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Workplaces"
              placeholder="Add new (ENTER)"
              error={valueMissing && !workplaces.length}
              helperText={
                valueMissing && !workplaces.length
                  ? "Please enter your workplaces"
                  : ""
              }
            />
          )}
        />

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

export default RegisterDoctor;
