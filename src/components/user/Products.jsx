import React from 'react'
import { Rating } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  height: 100%;
  width: 100%;
  @media only screen and (max-width: 768px) {
    justify-content: space-between;
  }
  @media only screen and (max-width: 480px) {
    justify-content: space-between;
  }
`;

export const Frame = styled(Link)`
  display: flex;
  width: 32%;
  border-radius: 10px;
  border: 1px solid lightgray;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 3px 2px 11px 1px rgba(0, 0, 0, 0.2);
  }
  @media only screen and (max-width: 768px) {
    width: 48%;
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 90%;
  object-fit: contain;
  height: 300px;
  @media only screen and (max-width: 768px) {
    height: 250px;
  }
  @media only screen and (max-width: 480px) {
    height: 200px;
  }
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
  font-size: 20px;
`;

export default function Products({products, title}) {
  return (
    <Container>
      <Wrapper>
        <Title latest>{title}</Title>
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
  )
}
