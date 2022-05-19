import styled from "styled-components";
import LeftSide from "../components/admin/LeftSide";
import Navbar from "../components/user/Navbar";
import Menu from "../components/user/Menu";
import Chart from "../components/admin/Chart";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const RightSide = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const SalesAnalytics = () => {
  const [sales, setSales] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        res.data
          .sort((a, b) => a._id - b._id)
          .map((item) => {
            setSales((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], Sales: item.total },
            ]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getSales();
  }, [MONTHS]);
  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <LeftSide />
        <RightSide>
          <Chart data={sales} title="Sales Analytics" grid dataKey="Sales" />
        </RightSide>
      </Container>
    </>
  );
};

export default SalesAnalytics;
