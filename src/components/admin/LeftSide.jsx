import styled from "styled-components";
import { navColor } from "../../constant/colors";
import { Link } from "react-router-dom";
import {
AnalyticsIcon,
ChartLineIcon,
FeedbackIcon,
HomeIcon,
MailIcon,
ManageIcon,
MessageIcon,
ProductsIcon,
ReportIcon,
SalesIcon,
UsersIcon
} from "../../constant/icons"

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
  svg{
    width: 18px;
    height: 18px;
  }
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
              <HomeIcon /> Home
            </ListItem>
            <ListItem to="/sales">
              <AnalyticsIcon /> Analytics
            </ListItem>
            <ListItem to="/admin">
              <SalesIcon /> Sales(not functional)
            </ListItem>
          </List>
          <Title>Quick Menu</Title>
          <List>
            <ListItem to="/admin/userlist">
              <UsersIcon /> Users
            </ListItem>
            <ListItem to="/admin/productlist">
              <ProductsIcon /> Products
            </ListItem>
            <ListItem to="/orders">
              <SalesIcon /> Transactions
            </ListItem>
            <ListItem to="/admin">
              <AnalyticsIcon /> Reports(nf)
            </ListItem>
          </List>
          <Title>Notifications</Title>
          <List>
            <ListItem to="/admin">
              <MailIcon /> Mail(nf)
            </ListItem>
            <ListItem to="/admin">
              <FeedbackIcon /> Feedbacks(nf)
            </ListItem>
            <ListItem to="/admin">
              <MessageIcon /> Messages(nf)
            </ListItem>
          </List>
          <Title>Staff</Title>
          <List>
            <ListItem to="/admin">
              <ManageIcon /> Manage(nf)
            </ListItem>
            <ListItem to="/admin">
              <ChartLineIcon /> Analytics(nf)
            </ListItem>
            <ListItem to="/admin">
              <ReportIcon /> Reports(nf)
            </ListItem>
          </List>
        </Wrapper>
      </Container>
    </>
  );
};

export default LeftSide;
