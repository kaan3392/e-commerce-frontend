import styled from "styled-components";
import LeftSide from "../components/admin/LeftSide";
import Navbar from "../components/user/Navbar";
import Menu from "../components/user/Menu";
import UsersList from "../components/admin/UsersList";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const RightSide = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const UserList = () => {
  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <LeftSide />
        <RightSide>
          <UsersList />
        </RightSide>
      </Container>
    </>
  );
};

export default UserList;
