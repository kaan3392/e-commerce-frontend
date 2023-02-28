import styled from "styled-components";
import {
  BoxIcon,
  TruckIcon,
  StoreIcon,
  CalendarIcon,
  CallCenterIcon,
  FastTruckIcon,
} from "../../constant/icons";

const Container = styled.div`
  width: 100%;
  height: 250px;
  background-color: #003177;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  svg {
    width: 40px;
    height: 40px;
    fill: white;
    flex: 1;
  }
`;
const Text = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: white;
  text-align: center;
  flex: 1;
`;

export default function Caurier() {
  return (
    <Container>
      <Wrapper>
        <InnerContainer>
          <BoxIcon />
          <Text>FREE CARGO</Text>
        </InnerContainer>
        <InnerContainer>
          <TruckIcon />
          <Text>STANDARD DELIVERY</Text>
        </InnerContainer>
        <InnerContainer>
          <FastTruckIcon />
          <Text>FAST DELIVERY</Text>
        </InnerContainer>
        <InnerContainer>
          <StoreIcon />
          <Text>DELIVERY FROM STORE</Text>
        </InnerContainer>
        <InnerContainer>
          <CalendarIcon />
          <Text>EASY RETURN</Text>
        </InnerContainer>
        <InnerContainer>
          <CallCenterIcon />
          <Text>ORDER BY PHONE</Text>
        </InnerContainer>
      </Wrapper>
    </Container>
  );
}
