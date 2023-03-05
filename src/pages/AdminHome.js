import styled from "styled-components";
import LeftSide from "../components/admin/LeftSide";
import Navbar from "../components/user/Navbar";
import Menu from "../components/user/Menu";
import FeaturedInfo from "../components/admin/FeaturedInfo";
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

const AdminHome = () => {
  const [userStats, setUserStats] = useState([]);

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
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data
          .sort((a, b) => a._id - b._id)
          .map((item) => {
            setUserStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], "Active Users": item.total },
            ]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <>
      <Navbar admin="admin" />
      <Menu />
      <Container>
        <LeftSide />
        <RightSide>
          <FeaturedInfo />
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active Users"
            heightMin="200px"
          />
        </RightSide>
      </Container>
    </>
  );
};

export default AdminHome;
