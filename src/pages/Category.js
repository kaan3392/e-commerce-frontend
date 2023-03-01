import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "../components/user/LoadingScreen";
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

const LoadingContainer = styled(Container)`
  align-content: center;
  justify-content: center;
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
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
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
    </>
  );
};

export default Category;
