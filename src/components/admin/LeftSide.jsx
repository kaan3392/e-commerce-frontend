import styled from "styled-components";
import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  Home,
  MailOutline,
  Person,
  Report,
  Storefront,
  Timeline,
  WorkOutline,
} from "@mui/icons-material";
import { navColor } from "../user/Navbar";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  border-right: 1px solid lightgray;
  @media only screen and (max-width: 385px) {
flex: 0.6;
}
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 90%;
  @media only screen and (max-width: 385px) {
padding: 10px;
}
`;

const Title = styled.div`
  font-size: 16px;
  color: gray;
  font-weight: 300;
  margin-top: 8px;
  margin-bottom: 3px;
  @media only screen and (max-width: 385px) {
font-size: 14px;
}
`;

const List = styled.ul`
  padding: 0;
  padding-bottom: 5px;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const ListItem = styled(Link)`
  display: flex;
  padding: 6px 0px;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: ${navColor};
    color:white;
  }
  svg {
    margin-right: 5px;
    @media only screen and (max-width: 385px) {
display: none;
}
  }
`;

const LeftSide = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Title>Dashboard</Title>
          <List>
            <ListItem to="/admin">
              <Home /> Home
            </ListItem>
            <ListItem to="/sales">
              <BarChart /> Analytics
            </ListItem>
            <ListItem to="/admin">
              <AttachMoney /> Sales(not functional)
            </ListItem>
          </List>
          <Title>Quick Menu</Title>
          <List>
            <ListItem to="/admin/userlist">
              <Person /> Users
            </ListItem>
            <ListItem to="/admin/productlist">
              <Storefront /> Products
            </ListItem>
            <ListItem to="/orders">
              <AttachMoney /> Transactions
            </ListItem>
            <ListItem to="/admin">
              <BarChart /> Reports(nf)
            </ListItem>
          </List>
          <Title>Notifications</Title>
          <List>
            <ListItem to="/admin">
              <MailOutline /> Mail(nf)
            </ListItem>
            <ListItem to="/admin">
              <DynamicFeed /> Feedbacks(nf)
            </ListItem>
            <ListItem to="/admin">
              <ChatBubbleOutline /> Messages(nf)
            </ListItem>
          </List>
          <Title>Staff</Title>
          <List>
            <ListItem to="/admin">
              <WorkOutline /> Manage(nf)
            </ListItem>
            <ListItem to="/admin">
              <Timeline /> Analytics(nf)
            </ListItem>
            <ListItem to="/admin">
              <Report /> Reports(nf)
            </ListItem>
          </List>
        </Wrapper>
      </Container>
    </>
  );
};

export default LeftSide;
