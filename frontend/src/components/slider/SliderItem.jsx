import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 770px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 2em;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin: 2em;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
`;

const Description = styled.p`
  margin: 2rem 0;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

function SliderItem({ item }) {
  return (
    <Container>
      <ImgContainer>
        <Image src={item.image} />
      </ImgContainer>
      <InfoContainer>
        <Typography variant="h4" color="white">
          {item.title}
        </Typography>
      </InfoContainer>
    </Container>
  );
}

export default SliderItem;
