import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import ProductList from "../components/user/ProductList";
import { publicRequest } from "../requestMethods";

export const Container = styled.div`
  width: 100%;
  display: flex;
  min-height: calc(100vh - 50px);
`;
export const Wrapper = styled.div`
  padding: 20px 150px;
  @media only screen and (max-width: 768px) {
    padding: 20px 50px;
  }
`;

const Category = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products?category=" + cat);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [cat, dispatch]);
  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <ProductList products={products} category={cat} />
        </Wrapper>
      </Container>
    </>
  );
};

export default Category;
