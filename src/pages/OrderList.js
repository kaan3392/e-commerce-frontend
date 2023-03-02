import styled from "styled-components";
import LeftSide from "../components/admin/LeftSide";
import AllOrders from "../components/admin/AllOrders";
import Navbar from "../components/user/Navbar";
import Menu from "../components/user/Menu";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const RightSide = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const OrderList = () => {
  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <LeftSide />
        <RightSide>
            <AllOrders/>
        </RightSide>
      </Container>
    </>
  )
}

export default OrderList