import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "../components/user/LoadingScreen";
import Caurier from "../components/user/Caurier";
import Footer from "../components/user/Footer";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import ProductList from "../components/user/ProductList";
import { publicRequest } from "../requestMethods";

export const Container = styled.div`
  width: 100%;
  display: flex;
  min-height: calc(100vh - 99pxpx);
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
export const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
`;

const Category = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/products?category=" + cat);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [cat, dispatch]);

  if (isLoading) {
    return (
        <LoadingScreen />
    );
  }

  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <ProductList products={products} category={cat} />
        </Wrapper>
      </Container>
      <Caurier />
      <Footer />
    </>
  );
};

export default Category;
