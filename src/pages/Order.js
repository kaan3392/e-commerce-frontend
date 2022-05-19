import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import { userRequest } from "../requestMethods";
import moment from "moment";

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  padding: 50px 450px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    padding: 30px 200px;
  }
  @media only screen and (max-width: 385px) {
    padding: 30px 20px;

  }
`;
const Text = styled.div`
  font-size: ${(props) => (props.tit ? "38px" : "30px")};
  font-weight: ${(props) => (props.tit && "600" )};
  margin-bottom: ${(props) => (props.tit ? "20px" : "10px")};
  margin-top: 5px;
  @media only screen and (max-width: 385px) {
    font-size: ${(props) => (props.tit ? "25px" : "23px")};

  }
`;
const Frame = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid lightgray;
  &:last-child {
    border: none;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Key = styled.div`
  font-size: 20px;
`;
const Value = styled.div`
  font-size: 20px;
  font-weight: ${(props) => props.money && "600"}; ;
`;
const ImageCon = styled(Link)``;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: contain;
`;

const ProductCon = styled.div`
display: flex;
align-items: center;
`;

const Order = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await userRequest.get(`/orders?id=${id}`);
        console.log(res.data);
        setOrder(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrder();
  }, [id]);

  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <Text tit>Order : {order._id}</Text>
          <Frame>
            <Text>Shipping</Text>
            <Item>
              <Key>Name:</Key>
              <Value>{order.userId?.username}</Value>
            </Item>
            <Item>
              <Key>Email:</Key>
              <Value>{order.userId?.email}</Value>
            </Item>
            <Item>
              <Key>Address:</Key>
              <Value>
                {order.address?.city}/{order.address?.country}
              </Value>
            </Item>
            <Item>
              <Key>Date:</Key>
              <Value>{moment(order.createdAt).format("LLL")}</Value>
            </Item>
            <Item>
              <Key>Delivered:</Key>
              <Value>{order.status}</Value>
            </Item>
          </Frame>
          <Frame>
            <Text>Payment Method</Text>
            <Item>
              <Key>Total:</Key>
              <Value money>${order.amount}</Value>
            </Item>
            <Item>
              <Key>Method:</Key>
              <Value>{order.paymentMethod}</Value>
            </Item>
            <Item>
              <Key>Paid</Key>
              <Value>{order.paid ? "yes" : "no"}</Value>
            </Item>
          </Frame>
          <Frame>
            <Text>Order Items</Text>
            {order.orderItems?.map((item, i) => (
              <Item key={i}>
                <ProductCon>
                  <ImageCon to={`/product/${item.product._id}`}>
                    <Image src={item.product.img} />
                  </ImageCon>
                  <Value>{item.product.title}</Value>
                </ProductCon>
                <Value>quanitiy:{item.quantity}</Value>
              </Item>
            ))}
          </Frame>
        </Wrapper>
      </Container>
    </>
  );
};

export default Order;
