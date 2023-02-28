import { Rating } from "@mui/material";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Frame,
  Image,
  Main,
  Price,
  Review,
  ReviewText,
} from "./LatestProducts";

const Top = styled.div`
  margin-bottom: 50px;
  padding-left: 20px;
`;

const Text = styled.span`
  font-size: 18px;
`;
const PriceFilter = styled.select`
  padding: 5px;
  border-radius: 5px;
`;
const PriceChoose = styled.option``;
const Bottom = styled.div``;
const Title = styled.div`
  font-size: ${(props) => (props.cat ? "35px" : "18px")};
  margin-left: 5px;
  margin-bottom: ${(props) => (props.cat ? "15px" : "5px")};
  font-weight: 500;
  color: #232f3e;
  padding-left: ${(props) => props.cat && "15px"};
`;

const ProductList = ({ category, products }) => {
  const catName = category.toUpperCase();
  // const { catProducts } = useSelector((state) => state.category);
  const [filterRange, setFilterRange] = useState(["0", "10000"]);

  const handleChange = (e) => {
    const { value } = e.target;
    const s = value.split("-");
    setFilterRange(s);
  };
 



  const filProducts = useMemo(() => {
    return products.filter((p) => {
      
      return p.price > Number(filterRange[0]) && p.price <= Number(filterRange[1]);
    });
  }, [filterRange, products]);


  return (
    <>
      <Top>
        <Text>Price: </Text>
        <PriceFilter onChange={handleChange}>
          <PriceChoose value="0-10000">Filter by price</PriceChoose>
          <PriceChoose value="0-200">Less than 200$</PriceChoose>
          <PriceChoose value="201-300">201$-300$</PriceChoose>
          <PriceChoose value="301-400">301$-400$</PriceChoose>
          <PriceChoose value="401-600">401$-600$</PriceChoose>
          <PriceChoose value="600-10000">More than 600$</PriceChoose>
        </PriceFilter>
      </Top>
      <Bottom>
        <Title cat>{catName}S</Title>
        <Main>
          {filProducts?.map((p, i) => (
            <Frame to={`/product/${p._id}`} key={i}>
              <Image src={p.img} />
              <Title>{p.title}</Title>
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
              <Price>{p.price}$</Price>
            </Frame>
          ))}
        </Main>
      </Bottom>
    </>
  );
};

export default ProductList;
