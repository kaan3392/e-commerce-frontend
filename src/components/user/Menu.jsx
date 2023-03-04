import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowRightIcon, CloseIcon } from "../../constant/icons";
import { MenuContext } from "../../Context/MenuContext";
import { logout } from "../../redux/userRedux";
import { data } from "../../data";

// const BackStyle = styled.div`
//   display: none;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 100;
//   transition: all 0.3s ease;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   @media only screen and (max-width: 768px) {
//     display: block;
//   }
// `;

const Container = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0px;
  left: ${(props) => (props.menu ? "0px" : "-768px")};
  background-color: white;
  transition: all 0.4s ease;
  color: #222222;
  @media only screen and (max-width: 768px) {
    display: flex;
  }
  @media only screen and (max-width: 385px) {
    left: ${(props) => (props.menu ? "0px" : "-385px")};
  }
`;

const Wrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WelcomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
 
`;
const Welcome = styled.div`
  width: 100%;
  padding: 5px;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 5px;
  border-bottom: 1px solid white;
`;

const IconContainer = styled.div`
display: flex;
align-items: center;
svg {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }
`
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
const ItemContainer = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin: 10px 0px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: gray;
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemText = styled.div``;
const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }
`;

const Menu = ({ admin }) => {
  const { menu, dispatch } = useContext(MenuContext);
  const { currentUser } = useSelector((state) => state.user);
  const reduxDispatch = useDispatch();

  return (
    <>
      {/* {menu && (
        <BackStyle>
          <div>X</div>
        </BackStyle>
      )} */}
      <Container admin={admin} menu={menu}>
        <Wrapper>
          <WelcomeContainer>
            <Welcome>
              Hello, {currentUser ? currentUser.username : "Guest"}
            </Welcome>
            <IconContainer onClick={() => dispatch({ type: "TOGGLE" })}>
              <CloseIcon />
            </IconContainer>
          </WelcomeContainer>
          <Categories>
            <Title>Categories</Title>
            {data.map((item, i) => (
              <ItemContainer
                onClick={() => dispatch({ type: "TOGGLE" })}
                to={item.cat}
                key={i}
              >
                <Left>
                  <ItemImage src={item.img} />
                  <ItemText>{item.name}</ItemText>
                </Left>
                <Right>
                  <ArrowRightIcon />
                </Right>
              </ItemContainer>
            ))}
          </Categories>
          <Categories>
            <Title>My Account</Title>
            <Item to="/">Home</Item>
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
    </>
  );
};

export default Menu;
