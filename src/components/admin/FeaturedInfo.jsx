import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  @media only screen and (max-width: 385px) {
    padding: 5px;
    justify-content: flex-start;
  }
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 250px;
  height: 110px;
  margin: 0px 30px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.17);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    background-color: #e4e4e4;
  }
  @media only screen and (max-width: 768px) {
    width: 150px;
    margin: 0 15px;
    height: 140px;
    padding: 20px;
  }
  @media only screen and (max-width: 385px) {
    width: 90px;
    height: 120px;
    padding: 10px;
    margin: 10px;
  }
`;

const Title = styled.div`
  font-size: 25px;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 385px) {
    font-size: 16px;
  }
`;

const MoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 385px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Money = styled.span`
  font-size: 35px;
  font-weight: 600;
  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 385px) {
    font-size: 25px;
  }
`;
const MoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  svg {
    color: ${(props) => (props.c ? "green" : "red")};
  }
  @media only screen and (max-width: 768px) {
    margin-left: 5px;
  }
`;

const Sub = styled.span`
  font-size: 18px;
  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [incomeRate, setIncomeRate] = useState(null);
  const [sales, setSales] = useState(null);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income?compare=true");
        const resData = res.data.sort((a, b) => a._id - b._id);
        setIncome((resData[1]?.total - resData[0]?.total).toLocaleString());
        setSales(resData[1].total.toLocaleString());
        setIncomeRate(
          ((resData[1]?.total * 100) / resData[0]?.total - 100).toFixed(2)
        );
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Frame>
          <Title>Revanue</Title>
          <MoneyContainer>
            <Money>${income}</Money>
            <MoneyRate c={incomeRate > 0 && "c"}>
              %{incomeRate}
              {incomeRate > 0 ? <ArrowUpward /> : <ArrowDownward />}
            </MoneyRate>
          </MoneyContainer>
          <Sub>Compared Last Month</Sub>
        </Frame>
        <Frame>
          <Title>Sales</Title>
          <MoneyContainer>
            <Money>${sales}</Money>
          </MoneyContainer>
          <Sub>This Month So Far</Sub>
        </Frame>
      </Wrapper>
    </Container>
  );
};

export default FeaturedInfo;
