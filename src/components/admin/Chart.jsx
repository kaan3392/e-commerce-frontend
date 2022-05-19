import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.17);
  height: ${(props) => props.height};
  box-sizing: border-box;
  @media only screen and (max-width: 768px) {
    height: ${(props) => props.heightMed};
  }
  @media only screen and (max-width: 385px) {
    height: ${(props) => props.heightMin};
    padding: 5px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const Chart = ({
  title,
  data,
  dataKey,
  grid,
  height,
  heightMed,
  heightMin,
}) => {
  return (
    <Container height={height} heightMin={heightMin} heightMed={heightMed}>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" aspect={5 / 2}>
        <LineChart data={data}>
          {grid && <CartesianGrid stroke="lightgray" strokeDasharray="3 3" />}
          <XAxis
            stroke="#383e42"
            allowDuplicatedCategory={false}
            interval={0}
            dataKey="name"
          />
          <YAxis stroke="#383e42" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="green"
            activeDot={{ r: 6 }}
            interval={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
