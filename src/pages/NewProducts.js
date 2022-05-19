import styled from "styled-components";
import LeftSide from "../components/admin/LeftSide";
import Navbar from "../components/user/Navbar";
import Menu from "../components/user/Menu";
import NewProduct from "../components/admin/NewProduct";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const RightSide = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const NewProducts = () => {
  return (
    <>
    <Navbar />
    <Menu />
    <Container>
      <LeftSide />
      <RightSide>
        <NewProduct/>
      </RightSide>
    </Container>
  </>
  )
}

export default NewProducts