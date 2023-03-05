import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import { emptyCart } from "../redux/cartRedux";
import LoadingScreen from "../components/user/LoadingScreen"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GoHome = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
`;

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const { currentUser } = useSelector((state) => state.user);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser.data.id,
          orderItems: cart.products.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            color: item.color,
            totalPriceInCart:item.quantity * item.price
          })),
          amount: cart.total,
          address: data.billing_details.address,
          paymentMethod: data.payment_method_details.type,
          paid: data.paid,
        });
        dispatch(emptyCart());
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }finally{
        setIsLoading(false)
      }
    };
    data && createOrder();
  }, [cart, data, currentUser, dispatch]);


  if(isLoading) return <LoadingScreen />


  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Oops! Somethings went so wrong!`}
      <GoHome to="/">
        <Button>Go to Homepage</Button>
      </GoHome>
    </Container>
  );
};

export default Success;
