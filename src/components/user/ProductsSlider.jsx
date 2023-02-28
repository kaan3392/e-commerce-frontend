import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { Arrow, Main } from "./Slider";
import { useState, useRef, useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 50vh;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    margin-top: 10px;
    height: 30vh;
  }
  @media only screen and (max-width: 385px) {
    height: 20vh;
  }
`;
const Wrapper = styled.div`
  width: 75%;
  height: 75%;
  border-radius: 20px;
  position: relative;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    width: 90%;
    display: flex;
  }
  @media only screen and (max-width: 385px) {
    width: 95%;
  }
`;
const Frame = styled(Link)`
  height: 100%;
  box-sizing: border-box;
  min-width: 33%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  @media only screen and (max-width: 768px) {
    min-width: 19%;
    padding: 15px;
  }
`;
const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;
const Desc = styled.span`
  position: absolute;
  font-size: 20px;
  color: black;
  top: 0;
  left: 25px;
  font-weight: 500;
  @media only screen and (max-width: 385px) {
    font-size: 16px;
    left: 20px;
  }
`;
const Price = styled.span`
  position: absolute;
  bottom: 0;
  right: 70px;
  font-size: 25px;
  color: black;
  font-weight: 300;
  @media only screen and (max-width: 385px) {
    font-size: 20px;

  }
`;
const MainCon = styled(Main)`
  transition: all 0.7s ease;
`;

const ProductsSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const frameRef = useRef(null);
  const mainRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products");
        const p = res.data.slice(0, 6);
        setProducts(p);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const productWidth = frameRef.current?.clientWidth;
    mainRef.current.style.transform = `translateX(${
      -productWidth * slideIndex
    }px)`;
  }, [slideIndex]);

  return (
    <Container>
      <Wrapper>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <MainCon ref={mainRef}>
          {products.map((p, i) => (
            <Frame key={i} to={`/product/${p._id}`} ref={frameRef}>
              <Image src={p.img} />
              <Desc>{p.title}</Desc>
              <Price>${p.price}</Price>
            </Frame>
          ))}
        </MainCon>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
      </Wrapper>
    </Container>
  );
};

export default ProductsSlider;
