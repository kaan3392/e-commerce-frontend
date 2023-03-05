import styled from "styled-components";
import {
  FavoriteIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "../../constant/icons";
import { color } from "../../constant/colors";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../Context/MenuContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { logout } from "../../redux/userRedux";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 99px;
  position: sticky;
  top: 0;
  z-index: 99;
  backdrop-filter: blur(10px);
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0px 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media only screen and (max-width: 768px) {
    padding: 0px 10px;
  }
`;

const Top = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: ${(props) => props.active && "flex-start"};
  height: 66px;
  border-bottom: ${(props) => (props.active ? "none" : "1px solid lightgray")};
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex: 1.5;
  }
  @media only screen and (max-width: 480px) {
    flex: 1;
  }
  svg {
    color: black;
    cursor: pointer;
    &:hover {
      color: gray;
    }
    &:active {
      color: red;
    }
  }
`;

const Logo = styled(Link)`
  font-size: 25px;
  color: ${color};
  text-decoration: underline;
  font-family: "Tapestry", cursive;
  letter-spacing: 1px;
  cursor: pointer;
  margin-left: 10px;
  display: ${(props) => props.sm && "none"};

  @media only screen and (max-width: 480px) {
    display: ${(props) => (props.sm ? "block" : "none")};
    margin-left: 5px;
  }
`;

const MenuToggle = styled.div`
  display: none;
  align-items: center;
  @media only screen and (max-width: 768px) {
    display: flex;
  }
  svg {
    fill: black;
    height: 18px;
    width: 18px;
    &:hover {
      fill: gray;
    }
  }
`;

const Center = styled.div`
  flex: 3;
  @media only screen and (max-width: 768px) {
    flex: 4;
  }
  @media only screen and (max-width: 480px) {
    flex: 4.5;
  }
`;

const SearchCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid white;
  background-color: white;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid lightgray;
  svg {
    height: 18px;
    width: 18px;
    margin-right: 5px;
  }
`;

const SearchInput = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  padding: 10px;
  width: 90%;
  border-radius: 2px;
  box-sizing: border-box;
  font-weight: lighter;
  margin-left: 5px;
`;

const Right = styled.div`
  flex: ${(props) => (props.currentUser ? 2.5 : 2)};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 480px) {
    flex: 1;
  }
  svg {
    color: black;
    margin-left: 10px;
    @media only screen and (max-width: 385px) {
      margin-left: 5px;
    }
  }
`;

const Item = styled(Link)`
  margin-left: 15px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    margin-left: 3px;
    &:hover {
      fill: red;
    }
  }
  @media only screen and (max-width: 768px) {
    margin-left: 10px;
  }
  @media only screen and (max-width: 480px) {
    display: ${(props) => props.min && "none"};
    margin-left: 5px;
  }
`;

const ItemIcon = styled(Item)`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    margin-left: 3px;
  }
`;

const Badge = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: white;
  border: 0.5px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -7px;
  right: -5px;
  color: ${(props) => (props.full ? "red" : "black")};
`;

const FilteredCon = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  top: 35px;
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: white;
`;

const Pro = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 5px;
  width: 100%;
  cursor: pointer;
  border-left: 3px solid transparent;
  &:hover {
    border-left: 3px solid lightgray;
  }
  &:first-child {
    margin-top: 5px;
  }
  @media only screen and (max-width: 385px) {
    padding: 3px 5px;
  }
`;

const Text = styled.div`
  font-size: 16px;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: contain;
  @media only screen and (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;

const Bottom = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 33px;
  display: ${(props) => (props.active ? "none" : "flex")};
  align-items: center;
`;

const Category = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-right: 1px solid lightgray;
  @media only screen and (max-width: 480px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 425px) {
    font-size: 12px;
  }
  &:hover {
    background-color: #f9f9f9;
  }
  &:last-child {
    border-right: none;
  }
`;

const Navbar = ({ admin }) => {
  const { dispatch } = useContext(MenuContext);
  const { currentUser } = useSelector((state) => state.user);
  const { quantity } = useSelector((state) => state.cart);
  const [text, setText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const [active, setActive] = useState(false);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    if (text === "") return;
    const filterProducts = async () => {
      try {
        const res = await publicRequest.get(`/products?filter=${text}`);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const timer = setTimeout(() => {
      filterProducts();
    }, 1000);
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (filteredProducts.length >= 1) {
      dispatch({ type: "DARKER_ON" });
    }
    if (text.length < 1) {
      dispatch({ type: "DARKER_OFF" });
    }
  }, [text, dispatch, filteredProducts.length]);

  const handleClick = (id) => {
    setText("");
    navigate(`/product/${id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Top active={active}>
          <Left>
            <MenuToggle onClick={() => dispatch({ type: "TOGGLE" })}>
              <MenuIcon />
            </MenuToggle>
            <Logo onClick={() => dispatch({ type: "MENU_OFF" })} to="/">
              Shop.
            </Logo>
            <Logo
              sm="true"
              onClick={() => dispatch({ type: "MENU_OFF" })}
              to="/"
            >
              S.
            </Logo>
          </Left>
          <Center>
            <SearchCon>
              <SearchInput
                onChange={(e) => setText(e.target.value)}
                placeholder="Search..."
              />
              <SearchIcon />
              {filteredProducts.length > 0 && text.length > 0 && (
                <FilteredCon>
                  {filteredProducts?.map((product, i) => (
                    <Pro key={i} onClick={() => handleClick(product._id)}>
                      <Text> {product.title}</Text>
                      <Image src={product.img} />
                    </Pro>
                  ))}
                </FilteredCon>
              )}
            </SearchCon>
          </Center>
          <Right currentUser={currentUser}>
            {!currentUser && (
              <>
                <Item min="true" to="/register">
                  Register
                </Item>
                <Item min="true" to="/login">
                  Login
                </Item>
              </>
            )}
            {currentUser?.data.isAdmin && (
              <Item min="true" to="/admin">
                Admin
              </Item>
            )}
            {currentUser && (
              <>
                <Item min="true" to="/profile">
                  My Account
                </Item>
                <Item min="true" onClick={() => reduxDispatch(logout())} to="/">
                  Logout
                </Item>
                <Item to="/profile">
                  <FavoriteIcon />
                </Item>
              </>
            )}
            <ItemIcon to="/cart">
              <Badge full={quantity?.length > 0}>{quantity}</Badge>
              <ShoppingCartIcon />
            </ItemIcon>
          </Right>
        </Top>
        {!admin && (
          <Bottom active={active}>
            <Category to={`/products/phone`}>
              <div>Phone</div>
            </Category>
            <Category to={`/products/laptop`}>
              <div>Laptop</div>
            </Category>
            <Category to={`/products/television`}>
              <div>Television</div>
            </Category>
            <Category to={`/products/tablet`}>
              <div>Tablet</div>
            </Category>
            <Category to={`/products/watch`}>
              <div>Watch</div>
            </Category>
            <Category to={`/products/camera`}>
              <div>Camera</div>
            </Category>
          </Bottom>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
