import styled from "styled-components";
import {
  BoxIcon,
  TruckIcon,
  StoreIcon,
  CalendarIcon,
  CallCenterIcon,
  FastTruckIcon,
} from "../../constant/icons";
import {color} from "../../constant/colors"

const Container = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${color};
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SplitContainer = styled.div`
display: flex;
@media only screen and (max-width: 768px) {
    flex-direction: column;
    flex:1;
    gap: 20px;
  }

`
const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  gap: 5px;
  svg {
    width: 40px;
    height: 40px;
    fill: white;
    /* flex: 1; */
    @media only screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
  }
`;
const Text = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: white;
  text-align: center;
  flex: 1;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 425px) {
    font-size: 16px;
  }
`;

export default function Caurier() {
  return (
    <Container>
      <Wrapper>
        <SplitContainer>
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
        </SplitContainer>
        <SplitContainer>
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
        </SplitContainer>
      </Wrapper>
    </Container>
  );
}
