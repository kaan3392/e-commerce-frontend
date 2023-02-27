import styled from "styled-components";
import { data } from "../../data";
import { useEffect, useState, useCallback } from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    height: 60vh;
  }
  @media only screen and (max-width: 385px) {
    height: 40vh;
  }
`;

const Wrapper = styled.div`
  width: 750px;
  height: 450px;
  margin-top: 40px;
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  @media only screen and (max-width: 385px) {
    width: 350px;
    height: 280px;
  }
`;

export const Arrow = styled.div`
  width: 30px;
  height: 30px;
  background-color: gray;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.8;
  z-index: 2;
  transition: all .2s ease;
  &:hover{
      transform: scale(1.3);
  }
  @media only screen and (max-width: 385px) {
    width: 20px;
    height: 20px;

  }
`;

export const Main = styled.div`
  height: 100%;
  display: flex;
  cursor: pointer;
`;

const SliderCon = styled.div`
  width:${props => props.active ? "750px" : "0px"};
  height: ${props => props.active ? "450px" : "0px"};
  position: relative;
  @media only screen and (max-width: 385px) {
    width:${props => props.active ? "350px" : "0px"};
  height: ${props => props.active ? "280px" : "0px"};
  }

`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => props.active ? 1 : 0};
  transition: all .5s ease;
 
`;

const Text = styled.span`
  position: absolute;
  top: 0;
  left: 5px;
  z-index: 2;
  color: white;
  font-size: 35px;
  font-weight: 500;
  display: ${props => !props.active && "none"};
  @media only screen and (max-width: 385px) {
    font-size: 25px;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
    }
  };

  const onClick = useCallback(() => {
      if(slideIndex < 3){
          setSlideIndex(prev => prev + 1)
      }else{
        setSlideIndex(0)
      }
  }, [slideIndex]);

  useEffect(() => {
    const interval_id = setInterval(onClick, 5000);
    return () => {
        clearInterval(interval_id);
    }
  },[onClick])

  return (
    <Container>
      <Wrapper>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <Main>
          {data.map((slide) => (
            <SliderCon active={slide.id === slideIndex} key={slide.id}>
              <Image active={slide.id === slideIndex} src={slide.img} />
              <Text active={slide.id === slideIndex}>{slide.desc}</Text>
            </SliderCon>
          ))}
        </Main>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
      </Wrapper>
    </Container>
  );
};

export default Slider;
