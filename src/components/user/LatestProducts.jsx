import { Rating } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const Wrapper = styled.div`
  width: 80%;
  @media only screen and (max-width: 768px) {
   padding: 0 100px;
  }
  @media only screen and (max-width: 385px) {
    padding: 0px 50px;
  }
`;

export const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  @media only screen and (max-width: 768px) {
   justify-content: flex-start;
  }
`;

export const Frame = styled(Link)`
  display: flex;
  width: 350px;
  border-radius: 10px;
  border:1px solid lightgray;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: all .5s ease;
  &:hover{
    transform: scale(1.02);
  }
  @media only screen and (max-width: 768px) {
   width: 250px;
  }
  
`;

export const Image = styled.img`
  width: 90%;
  object-fit: contain;
  height: 300px;
`;

export const Review = styled.div`
  margin-left: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const ReviewText = styled.span`
  margin-left: 5px;
`;

const Title = styled.div`
  font-size: ${(props) => (props.latest ? "25px" : "18px")};
  margin-left: 5px;
  margin-bottom: ${(props) => (props.latest ? "15px" : "5px")};
  font-weight: 300;
  color: #232f3e;
  padding-left: ${(props) => props.latest && "15px"};
`;

export const Price = styled.span`
  font-weight: 500;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products?newPro=true");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title latest>Latest Products</Title>
        <Main>
          {products?.map((p, i) => (
            <Frame key={i} to={`/product/${p._id}`}>
              <Image src={p.img} />
              <Title>{p.title}</Title>
              {p.comments?.length > 0 && (
                <Review>
                  <Rating
                    name="half-rating-read"
                    value={
                      p.comments?.reduce(
                        (acc, curr) => (acc = acc + curr.review),
                        0
                      ) / p.comments?.length || 0
                    }
                    precision={0.5}
                    readOnly
                  />
                  <ReviewText>{p.comments?.length} review</ReviewText>
                </Review>
              )}
              <Price>{p.price}$</Price>
            </Frame>
          ))}
        </Main>
      </Wrapper>
    </Container>
  );
};

export default LatestProducts;
