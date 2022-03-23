import styled from "@emotion/styled";
import { Info, Key, Person } from "@mui/icons-material";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";
import { API_HOST } from "../constants/apiLinks";

const StyledNavLink = styled(NavLink)`
  color: black;
  text-transform: capitalize;
  padding: 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  transition: 0.5s;

  :hover {
    background-color: #1976d24a;
  }

  &.active {
    background-color: #1976d2;
    color: #ffffff;
  }

  @media (max-width: 800px) {
    justify-content: center;
  }
`;

function ProfilePage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [profilePic, setProfilePic] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length) {
      navigate("/profile/account");
    } else {
      navigate("/sign-in");
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length) {
      if (!(user && Object.keys(user).length)) {
        dispatch(getUserDetails());
      } else {
        setProfilePic(user.profileImage);
      }
    } else {
      navigate("/sign-in");
    }
  }, [dispatch, navigate, user, userInfo]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      divider={<Divider orientation="vertical" flexItem />}
      height={"100%"}
      justifyContent={"center"}
      bgcolor={"#fff"}
    >
      <Stack divider={<Divider />} minWidth={"280px"}>
        <Stack spacing={4} py={4}>
          <Avatar
            alt="Profile Picture"
            src={profilePic && `${API_HOST}/${profilePic}`}
            sx={{ width: 150, height: 150, alignSelf: "center" }}
          />
          <Typography variant="h4" my={4} textAlign={"center"}>
            {userInfo.name}
          </Typography>
        </Stack>

        <StyledNavLink to="/profile/account">
          <Person />
          <Typography variant="body1">Account</Typography>
        </StyledNavLink>
        <StyledNavLink to="/profile/change-password">
          <Key />
          <Typography variant="body1">Password</Typography>
        </StyledNavLink>
        {userInfo.role === "doctor" && (
          <StyledNavLink to="/profile/other">
            <Info />
            <Typography variant="body1">Other</Typography>
          </StyledNavLink>
        )}
      </Stack>
      <Box sx={{ flex: "1", p: 5 }}>
        <Outlet />
      </Box>
    </Stack>
  );
}

export default ProfilePage;
