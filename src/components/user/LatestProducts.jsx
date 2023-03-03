
import { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";
import LoadingScreen from "./LoadingScreen";
import Products from "./Products";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 110vh;
  background-color: black;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
`;



const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get("/products?newPro=true");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingScreen />
      </Container>
    );
  }

  return (
    <Products title="Latest Products" products={products} />
  );
};

export default LatestProducts;
