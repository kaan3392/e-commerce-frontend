import styled from "styled-components";
import { data } from "../../data";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "../../constant/icons";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 99px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    height: calc(60vh - 99px);
    margin: 20px 0px;
  }
  @media only screen and (max-width: 480px) {
    height: calc(50vh - 99px);
    margin: 10px 0px;
  }
  @media only screen and (max-width: 385px) {
    height: calc(40vh - 99px);
  }
`;

const Wrapper = styled.div`
  width: 95%;
  max-width: 900px;
  min-height:630px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 480px) {
    min-height:500px;
  }
`;

const Top = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 40px;
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
 
  @media only screen and (max-width: 768px) {
    /* min-height:400px; */
    margin-top: 20px;
  }
  @media only screen and (max-width: 480px) {
    height:400px;
    margin-top: 10px;
  }
  
  @media only screen and (max-width: 385px) {
    height: 280px;
  }
`;

export const Arrow = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ededed;
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
  opacity: 0.7;
  z-index: 2;
  transition: all 0.2s ease;
  svg {
    height: 20px;
    width: 20px;
  }
  &:hover {
    transform: scale(1.1);
  }
  @media only screen and (max-width: 385px) {
    width: 20px;
    height: 20px;
  }
`;

export const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  cursor: pointer;
`;

const SliderCon = styled(Link)`
  width: ${(props) => (props.active ? "100%" : "0px")};
  min-height: ${(props) => (props.active ? "100%" : "0px")};
  position: relative;
  text-decoration: none;
  color: inherit;
  /* @media only screen and (max-width: 385px) {
    width: ${(props) => (props.active ? "350px" : "0px")};
    height: ${(props) => (props.active ? "280px" : "0px")};
  } */
`;

const Image = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.5s ease;
`;

const Text = styled.span`
  position: absolute;
  top: 0;
  left: 5px;
  z-index: 2;
  color: white;
  font-size: 35px;
  font-weight: 500;
  display: ${(props) => !props.active && "none"};
  @media only screen and (max-width: 385px) {
    font-size: 25px;
  }
`;

const Bottom = styled.div`
  width: 100%;
 height: 120px;
  margin-top: 5px;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  gap: 5px;
  @media only screen and (max-width: 480px) {
    height: 80px;
  }
`;

const LittleImageContainer = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

const LittleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 4);
    } else {
      setSlideIndex(slideIndex < 4 ? slideIndex + 1 : 0);
    }
  };

  const onClick = useCallback(() => {
    if (slideIndex < 4) {
      setSlideIndex((prev) => prev + 1);
    } else {
      setSlideIndex(0);
    }
  }, [slideIndex]);

  useEffect(() => {
    const interval_id = setInterval(onClick, 7000);
    return () => {
      clearInterval(interval_id);
    };
  }, [onClick]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftIcon />
          </Arrow>
          <Main>
            {data.map((slide) => (
              <SliderCon
                to={slide.cat}
                active={slide.id === slideIndex}
                key={slide.id}
              >
                <Image active={slide.id === slideIndex} src={slide.img} />
                <Text active={slide.id === slideIndex}>{slide.desc}</Text>
              </SliderCon>
            ))}
          </Main>
          <Arrow direction="right" onClick={() => handleClick("right")}>
            <ArrowRightIcon />
          </Arrow>
        </Top>
        <Bottom>
          {data.map((item, index) => (
            <LittleImageContainer
              key={index}
              onClick={() => setSlideIndex(index)}
            >
              <LittleImage src={item.img} />
            </LittleImageContainer>
          ))}
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Slider;
