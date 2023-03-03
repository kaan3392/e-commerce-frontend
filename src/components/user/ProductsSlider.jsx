import styled from "styled-components";
import { Arrow, Main } from "./Slider";
import { useState, useRef, useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { ArrowLeftIcon, ArrowRightIcon } from "../../constant/icons";

const Container = styled.div`
  width: 100%;
  height: 350px;
  margin: 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  @media only screen and (max-width: 768px) {
    height: 300px;
    margin: 40px 0px;
  }
  @media only screen and (max-width: 480px) {
    height: 250px;
    margin: 30px 0px;
  }
`;
const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
  height: 90%;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.14);
`;

const MainCon = styled(Main)`
  transition: all 0.5s ease;
  height: 100%;
`;

const Frame = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 25%;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  min-height: 100%;
  @media only screen and (max-width: 768px) {
    min-width: 33%;
    padding: 15px;
  }
  @media only screen and (max-width: 480px) {
    min-width: 50%;
    padding: 0;
  }
  @media only screen and (max-width: 425px) {
    min-width: 100%;
    padding: 0;
  }
`;
const Image = styled.img`
  height: 75%;
  width: 100%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25%;
  width: 100%;
  gap: 5px;
`;

const Desc = styled.div`
  flex: 1;
  font-size: 18px;
  color: black;
  font-weight: 300;
  @media only screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const Price = styled.div`
  flex: 1;
  font-size: 20px;
  color: black;
  font-weight: 500;
  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 385px) {
    font-size: 16px;
  }
`;

const ProductsSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const frameRef = useRef(null);
  const mainRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [numberOfProductShown, setNumberOfProductShown] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get("/products?price=true");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 6 - numberOfProductShown);
    } else {
      setSlideIndex(slideIndex < 6 - numberOfProductShown ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const productWidth = frameRef.current?.clientWidth;
    mainRef.current.style.transform = `translateX(${
      -productWidth * slideIndex
    }px)`;
  }, [slideIndex]);

  useEffect(() => {
    if (!frameRef.current) {
      return;
    }
    setSlideWidth(frameRef.current.clientWidth);
    if (!mainRef.current) {
      return;
    }
    mainRef.current.style.transform = `translateX(${
      -slideWidth * slideIndex
    }px)`;
    setNumberOfProductShown(
      Math.round(mainRef.current.clientWidth / frameRef.current.clientWidth)
    );
  }, [slideIndex, slideWidth]);

  if (loading) {
    return (
      <Container>
        <LoadingScreen />
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftIcon />
        </Arrow>
        <MainCon ref={mainRef}>
          {products?.map((p, i) => (
            <Frame key={i} to={`/product/${p._id}`} ref={frameRef}>
              <Image src={p.img} />
              <TextContainer>
                <Desc>{p.title}</Desc>
                <Price>${p.price}</Price>
              </TextContainer>
            </Frame>
          ))}
        </MainCon>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightIcon />
        </Arrow>
      </Wrapper>
    </Container>
  );
};

export default ProductsSlider;
