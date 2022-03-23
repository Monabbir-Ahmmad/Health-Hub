import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import NavHamburger from "./NavHamburger";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../../actions/userActions";
import { StyledNavLink } from "./NavItem";
import AppIcon from "../AppIcon";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 1rem;
  background: #fff;
  border-bottom: 0.5px solid #dbdbdb;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: 800px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    margin-bottom: 5px;
    max-height: ${({ isMenuOpen }) => (isMenuOpen ? 1000 : 0)}px;
    transition: max-height 1s ease;
  }
`;

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const isLoggedIn = userInfo && Object.keys(userInfo).length > 0;

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Container>
      <StyledLink to="/">
        <AppIcon />
      </StyledLink>

      <NavHamburger
        color={"#000"}
        isMenuOpen={isMenuOpen}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      />
      <Menu isMenuOpen={isMenuOpen}>
        <StyledNavLink to="/home">Home</StyledNavLink>

        <StyledNavLink to="/appointments">Appointments</StyledNavLink>

        <StyledNavLink to="/q-a">Q&A</StyledNavLink>

        <StyledNavLink to="/blogs">Blogs</StyledNavLink>

        <StyledNavLink to="/drug-info">Drug Info</StyledNavLink>

        <StyledNavLink to="/detect">Detect</StyledNavLink>

        {!isLoggedIn && <StyledNavLink to="/sign-up">Sign up</StyledNavLink>}
        {isLoggedIn ? (
          <StyledNavLink to="/profile">{userInfo.name}</StyledNavLink>
        ) : (
          <StyledNavLink to="/sign-in">Sign in</StyledNavLink>
        )}

        {isLoggedIn && (
          <Button
            variant="outlined"
            sx={{ fontSize: "1rem" }}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        )}
      </Menu>
    </Container>
  );
}

export default Navbar;
