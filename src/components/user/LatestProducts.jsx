import { Rating } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 0 200px;
  @media only screen and (max-width: 768px) {
   padding: 0 100px;
  }
  @media only screen and (max-width: 385px) {
    padding: 0px 50px;
  }
`;

export const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
   justify-content: flex-start;
  }
`;

export const Frame = styled(Link)`
  display: flex;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0px 0px 11px -5px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  margin-right: 20px;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  @media only screen and (max-width: 768px) {
   width: 250px;
  }
  
`;

export const Image = styled.img`
  width: 100%;
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
  font-weight: 500;
  color: #232f3e;
  padding-left: ${(props) => props.latest && "15px"};
`;

export const Price = styled.span`
  font-weight: 300;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products?newPro=true");
        console.log(res.data)
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
          {products.map((p, i) => (
            <Frame key={i} to={`/product/${p._id}`}>
              <Image src={p.img} />
              <Title>{p.title}</Title>
              {p.comments.length > 0 && (
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
