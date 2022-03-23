import styled from "@emotion/styled";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import SliderItem from "./SliderItem";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #1976D2;
`;

const Arrow = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: lightgray;
  opacity: 0.7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ direction }) => direction === "left" && "10px"};
  right: ${({ direction }) => direction === "right" && "10px"};
  margin: auto;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${({ slideIndex }) => -100 * slideIndex}vw);
`;

const slideDataSet = [
  {
    image:
      "https://assets-news.housing.com/news/wp-content/uploads/2021/05/12124632/Pune-has-the-best-health-infra-among-India%E2%80%99s-eight-prime-cities-shows-Housing.com%E2%80%99s-City-Health-Card-FB-1200x700-compressed.jpg",
    title:
      "Contact our professionals and get live healthcare from your digital devices",
  },
  {
    image:
      "https://previews.123rf.com/images/natalimis/natalimis1709/natalimis170900035/85348604-doctors-answer-the-questions-the-concept-of-medical-consultation-.jpg",
    title: "Ask our doctors about your health concerns in the Q&A section",
  },
  {
    image:
      "https://commonfund.nih.gov/sites/default/files/Abstract%20infographic%20medicine%20vector%20background%20lines%2C%20circles%2C%20integrate%20flat%20icons.-470578316-Cropped.jpg",
    title:
      "We have many different health related blogs that will help you make better health related choices",
  },
  {
    image:
      "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/E731_Google_Health_Illustration_Blog.max-1000x1000.png",
    title:
      "Register as a doctor and easily give healthcare service to the people in need",
  },
];

// Main slide function
function Slider() {
  //This is the slide index
  const [slideIndex, setSlideIndex] = useState(0);

  //This is the arrow click handler for the slides
  const handleSliderArrowClick = (direction, slideItemCount) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideItemCount - 1);
    } else {
      setSlideIndex(slideIndex < slideItemCount - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow
        direction="left"
        onClick={() => {
          handleSliderArrowClick("left", slideDataSet.length);
        }}
      >
        <ArrowBackIos />
      </Arrow>

      <Arrow
        direction="right"
        onClick={() => {
          handleSliderArrowClick("right", slideDataSet.length);
        }}
      >
        <ArrowForwardIos />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {slideDataSet.map((item, index) => (
          <SliderItem key={index} item={item} />
        ))}
      </Wrapper>
    </Container>
  );
}

export default Slider;
