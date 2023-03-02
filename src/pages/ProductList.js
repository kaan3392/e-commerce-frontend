import styled from "styled-components";
import LeftSide from "../components/admin/LeftSide";
import Navbar from "../components/user/Navbar";
import Menu from "../components/user/Menu";
import ProductsList from "../components/admin/ProductsList";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const RightSide = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const ProductList = () => {
  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <LeftSide />
        <RightSide>
          <ProductsList />
        </RightSide>
      </Container>
    </>
  )
}

export default ProductList