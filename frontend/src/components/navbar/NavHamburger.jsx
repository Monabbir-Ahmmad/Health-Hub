import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    background-color: ${({ color }) => color || "#000"};
    height: 3px;
    width: 30px;
    margin: 2px;
    border-radius: 50px;
    transition: transform 0.5s ease;
  }

  span:nth-of-type(1) {
    transform: rotate(${({ isMenuOpen }) => (isMenuOpen ? 45 : 0)}deg)
      translateY(${({ isMenuOpen }) => (isMenuOpen ? 10 : 0)}px);
  }

  span:nth-of-type(2) {
    transform: scale(${({ isMenuOpen }) => (isMenuOpen ? 0 : 1)});
  }

  span:nth-of-type(3) {
    transform: rotate(${({ isMenuOpen }) => (isMenuOpen ? -45 : 0)}deg)
      translateY(${({ isMenuOpen }) => (isMenuOpen ? -10 : 0)}px);
  }

  @media (max-width: 800px) {
    display: flex;
  }
`;
function NavHamburger({ color, isMenuOpen, onClick }) {
  return (
    <Container color={color} isMenuOpen={isMenuOpen} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </Container>
  );
}

export default NavHamburger;
