import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MenuContext } from "../../Context/MenuContext";
import { logout } from "../../redux/userRedux";

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 350px;
  height: 100vh;
  z-index: 10;
  left: ${(props) => (props.menu ? "0px" : "-350px")};
  background-color: #232f3e;
  transition: all 0.4s ease;
  color: white;
  @media only screen and (max-width: 385px) {
    width: 385px;
    left: ${(props) => (props.menu ? "0px" : "-385px")};

  }
`;

const Wrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Welcome = styled.div`
  width: 100%;
  padding: 5px;
  font-size: 25px;
  font-weight: 500;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  border-bottom: 1px solid white;
  padding: 5px;
`;

const Categories = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const Item = styled(Link)`
  font-size: 18px;
  color: inherit;
  text-decoration: none;
  margin: 10px 0px;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
`;

const Menu = ({ admin }) => {
  const { menu, dispatch } = useContext(MenuContext);
  const { currentUser } = useSelector((state) => state.user);
  const reduxDispatch = useDispatch();

  return (
    <Container admin={admin} menu={menu}>
      <Wrapper>
        <Welcome>Hello, {currentUser ? currentUser.username :"Guest"}</Welcome>
        <Categories>
          <Title>Categories</Title>
          <Item
            onClick={() => dispatch({ type: "TOGGLE" })}
            to={`/products/laptop`}
          >
            Laptops
          </Item>
          <Item
            onClick={() => dispatch({ type: "TOGGLE" })}
            to={`/products/phone`}
          >
            Phone
          </Item>
          <Item
            onClick={() => dispatch({ type: "TOGGLE" })}
            to={`/products/television`}
          >
            Television
          </Item>
          <Item
            onClick={() => dispatch({ type: "TOGGLE" })}
            to={`/products/tablet`}
          >
            Tablet
          </Item>
          <Item
            onClick={() => dispatch({ type: "TOGGLE" })}
            to={`/products/watch`}
          >
            Watch
          </Item>
          <Item
            onClick={() => dispatch({ type: "TOGGLE" })}
            to={`/products/camera`}
          >
            Camera
          </Item>
        </Categories>
        <Categories>
          <Title>My Account</Title>
          <Item to="/">Home</Item>
          <Item to="/">Customer service</Item>
          {currentUser === null && (
            <>
              <Item to="/login">Login</Item>
              <Item to="/register">Register</Item>
            </>
          )}
          {currentUser && (
            <>
              <Item to="/profile">Profile</Item>
              <Item onClick={() => reduxDispatch(logout())} to="/">
                Logout
              </Item>
            </>
          )}
          {currentUser?.isAdmin && <Item to="/admin">Go to Admin Page</Item>}
        </Categories>
      </Wrapper>
    </Container>
  );
};

export default Menu;
