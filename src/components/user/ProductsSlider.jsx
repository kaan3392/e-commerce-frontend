import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { Arrow, Main } from "./Slider";
import { useState, useRef, useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 60vh;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
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
  height: 85%;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.14);
  gap: 20px;
  @media only screen and (max-width: 768px) {
    width: 90%;
    display: flex;
  }
  @media only screen and (max-width: 385px) {
    width: 95%;
  }
  `;
const Frame = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
  min-width: 25%;
  text-decoration: none;
  color: inherit;
  @media only screen and (max-width: 768px) {
    min-width: 19%;
    padding: 15px;
  }
`;
const Image = styled.img`
  height: 70%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Desc = styled.div`
  font-size: 20px;
  color: black;
  font-weight: 300;
  @media only screen and (max-width: 385px) {
    font-size: 16px;
  }
`;

const Price = styled.div`
  font-size: 28px;
  color: black;
  font-weight: 500;
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
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const res = await publicRequest.get("/products?newPro=true");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setError(err)
      }finally{
        setLoading(false)
      }
    };
    getProduct();
  }, []);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const productWidth = frameRef.current?.clientWidth;
    mainRef.current.style.transform = `translateX(${
      -productWidth * slideIndex
    }px)`;
  }, [slideIndex]);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Wrapper>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
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
          <ArrowRightOutlined />
        </Arrow>
      </Wrapper>
    </Container>
  );
};

export default ProductsSlider;
