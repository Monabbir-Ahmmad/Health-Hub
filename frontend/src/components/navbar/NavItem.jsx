import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

const StyledNavLink = styled(NavLink)`
  font-size: 1rem;
  color: black;
  text-transform: uppercase;
  padding: 0.5rem;
  white-space: nowrap;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #1976d2;
    transition: all 0.5s ease;
    transform: scaleX(0);
  }

  :hover {
    ::before {
      transform: scaleX(1);
    }
  }

  &.active::before {
    transform: scaleX(1);
  }
`;

export { StyledNavLink };
