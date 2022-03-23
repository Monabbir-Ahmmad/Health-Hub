import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "@emotion/styled";
import { updateUserPassword } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const StyledForm = styled.form`
  display: flex;

  @media (max-width: 900px) {
    align-item: center;
    justify-content: center;
  }
`;

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [valueMissing, setValueMissing] = useState(false);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, success, error } = useSelector(
    (state) => state.userPasswordUpdate
  );

  useEffect(() => {
    if (!(userInfo && Object.keys(userInfo).length)) {
      navigate("/sign-in");
    }
  }, [navigate, userInfo]);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = (prop) => (e) => {
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(values).every((key) => values[key]) &&
      values.newPassword === values.confirmNewPassword
    ) {
      setValueMissing(false);
      dispatch(updateUserPassword(values.oldPassword, values.newPassword));
    } else {
      setValueMissing(true);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Stack spacing={4} maxWidth={"400px"} flex={1}>
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          Change password
        </Typography>

        {loading && <LinearProgress />}

        {error && <Alert severity="error">{error}</Alert>}

        {success && <Alert severity="success">Update successful</Alert>}

        <TextField
          variant="outlined"
          label="Current Password"
          type={showPassword.oldPassword ? "text" : "password"}
          error={valueMissing && !values.oldPassword}
          helperText={
            valueMissing && !values.oldPassword
              ? "Please enter your current password"
              : ""
          }
          value={values.oldPassword}
          onChange={handleChange("oldPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword("oldPassword")}>
                  {showPassword.oldPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          label="New Password"
          type={showPassword.newPassword ? "text" : "password"}
          error={valueMissing && !values.newPassword}
          helperText={
            valueMissing && !values.newPassword
              ? "Please enter your new password"
              : ""
          }
          value={values.newPassword}
          onChange={handleChange("newPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword("newPassword")}>
                  {showPassword.newPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          label="Confirm New Password"
          type={showPassword.confirmNewPassword ? "text" : "password"}
          error={
            valueMissing &&
            (!values.confirmNewPassword ||
              values.newPassword !== values.confirmNewPassword)
          }
          helperText={
            valueMissing &&
            (!values.confirmNewPassword ||
              values.newPassword !== values.confirmNewPassword)
              ? "Please confirm your new password"
              : ""
          }
          value={values.confirmNewPassword}
          onChange={handleChange("confirmNewPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword("confirmNewPassword")}
                >
                  {showPassword.confirmNewPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" type="submit">
          Confirm changes
        </Button>
      </Stack>
    </StyledForm>
  );
}

export default UpdatePassword;
