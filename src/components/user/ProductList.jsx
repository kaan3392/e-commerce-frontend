import { useState, useMemo } from "react";
import styled from "styled-components";
import Products from "./Products";


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

// const Title = styled.div`
//   font-size: ${(props) => (props.cat ? "35px" : "18px")};
//   margin-left: 5px;
//   margin-bottom: ${(props) => (props.cat ? "15px" : "5px")};
//   font-weight: 500;
//   color: #232f3e;
//   padding-left: ${(props) => props.cat && "15px"};
// `;

const ProductList = ({ category, products }) => {
  const catName = category.toUpperCase();
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
          <option value="0-10000">Filter by price</option>
          <option value="0-200">Less than 200$</option>
          <option value="201-300">201$-300$</option>
          <option value="301-400">301$-400$</option>
          <option value="401-600">401$-600$</option>
          <option value="600-10000">More than 600$</option>
        </PriceFilter>
      </Top>
      <div>
        <Products title={catName} products={filProducts} />
      </div>
    </>
  );
};

export default ProductList;
