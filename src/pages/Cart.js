import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import { Container } from "./Category";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { deleteProduct, emptyCart } from "../redux/cartRedux";
import {color} from "../constant/colors"


const KEY = process.env.REACT_APP_STRIPE;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 150px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    padding: 10px 30px;
  }
  
`;

const Title = styled.h1`
  padding-bottom: 20px;
  text-align: center;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 385px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 2;
  @media only screen and (max-width: 385px) {
    margin-bottom: 20px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
`;

const ImageCon = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  @media only screen and (max-width: 385px) {
    width: 50px;
    height: 50px;
  }
`;

const ImageTitle = styled.div`
  flex: 1;
  padding: 5px;
`;

const Price = styled.div`
  flex: 1;
  padding: 5px;
`;

const ColorCon = styled.div`
  flex: 1;
  padding: 5px;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.c};
  border: 2px solid tomato;
`;

const QuantityCon = styled.div`
  flex: 1;
  padding: 5px;
`;

const ButtonCon = styled.div`
  flex: 1;
  padding: 5px;
  svg {
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
      color: red;
    }
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 10px 20px;
`;

const RightCon = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 10px;
`;

const CartTitle = styled.div`
  font-size: ${(props) => (props.title || props.total ? "25px" : "18px")};
  margin-bottom: ${(props) => props.title && "20px"};
  font-weight: ${(props) => props.title || (props.total && "500")};
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.title || props.total ? "20px" : "16px")};
  }
`;

const CartPrice = styled.div`
  font-size: 18px;
  font-weight: ${(props) => props.total && "500"};
`;

const CartButton = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  margin: 10px 0px;
  background-color: ${color};
  color: white;
  font-size: 16px;
  width: ${(props) => props.empty && "100%"};
  &:hover {
    background-color: gray;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const CartItem = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
`;

const WarningCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`;
const Warning = styled.div`
  font-size: 25px;
  letter-spacing: 2px;
`;

const Empty = styled.div``;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", { state: { stripeData: res.data, cart: cart } });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && cart.total > 0 && makeRequest();
  }, [stripeToken, cart, navigate]);

  const handleDelete = (product) => {
    dispatch(deleteProduct(product));
  };

  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <Title>Shopping Cart</Title>
          <Main>
            <Left>
              {cart.products.map((product, i) => (
                <Item key={i}>
                  <ImageCon to={`/product/${product._id}`}>
                    <Image src={product.img} />
                  </ImageCon>
                  <ImageTitle>{product.title}</ImageTitle>
                  <Price>${product.price * product.quantity}</Price>
                  <ColorCon>
                    <Color c={product.color} />
                  </ColorCon>
                  <QuantityCon>{product.quantity}</QuantityCon>
                  <ButtonCon onClick={() => handleDelete(product)}>
                    <Delete />
                  </ButtonCon>
                </Item>
              ))}
              {cart.products.length === 0 && (
                <WarningCon>
                  <Warning>Your Cart is Empty...</Warning>
                </WarningCon>
              )}
            </Left>
            <Right>
              <RightCon>
                <CartTitle title>Order Summary</CartTitle>
                {cart.products.length > 0 && (
                  <>
                    <CartItem>
                      <CartTitle>Subtotal</CartTitle>
                      <CartPrice>${cart.total}</CartPrice>
                    </CartItem>
                    <CartItem>
                      <CartTitle>Estimated Shipping</CartTitle>
                      <CartPrice>$5,90</CartPrice>
                    </CartItem>
                    <CartItem>
                      <CartTitle>Shipping Discount</CartTitle>
                      <CartPrice>-$5,90</CartPrice>
                    </CartItem>
                  </>
                )}
                <CartItem>
                  <CartTitle total>Total</CartTitle>
                  <CartPrice total>${cart.total}</CartPrice>
                </CartItem>
                <StripeCheckout
                  name="knlcl"
                  image="https://en.pimg.jp/070/036/404/1/70036404.jpg"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <CartButton
                    disabled={
                      cart.products.length === 0 || currentUser === null
                    }
                  >
                    Proceed To Checkout
                  </CartButton>
                </StripeCheckout>
              </RightCon>
              <Empty>
                <CartButton empty onClick={() => dispatch(emptyCart())}>
                  Empty the Cart
                </CartButton>
              </Empty>
            </Right>
          </Main>
        </Wrapper>
      </Container>
    </>
  );
};

export default Cart;
