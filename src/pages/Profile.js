import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import {color} from "../constant/colors"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import moment from "moment";
import { InfoOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { updateUser } from "../redux/apiCalls";
import { createTheme, ThemeProvider } from "@mui/material";

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  padding: 20px 150px;
  display: flex;
  @media only screen and (max-width: 768px) {
    padding: 10px;
  }
  @media only screen and (max-width: 385px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid lightgray;
  padding: 2px;
  @media only screen and (max-width: 768px) {
    flex: 2;
  }
  @media only screen and (max-width: 385px) {
    margin-bottom: 10px;

  }
`;
const Text = styled.div`
  border-bottom: ${(props) => props.prof && "1px solid lightgray"};
  font-size: ${(props) => (props.prof ? "24px" : "18px")};
  padding-bottom: ${(props) => props.prof && "15px"};
  margin-bottom: 8px;
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.prof ? "20px" : "15px")};
  }
`;
const InputContainer = styled.div`
  width: 90%;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  margin-bottom: 12px;
`;

const Input = styled.input`
  padding: 7px;
  margin: 0px 2px;
  width: 80%;
  outline: none;
  border: none;
  font-size: 16px;
  @media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  color: white;
  width: 100px;
  background-color: ${color};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
  @media only screen and (max-width: 768px) {
    padding: 5px 10px;
    width: 70px;
  }
`;
const Right = styled.div`
  flex: 3;
  padding: 5px 5px 5px 15px;
  @media only screen and (max-width: 768px) {
    flex: 5;
  }
  @media only screen and (max-width: 385px) {
    padding: 5px;

  }
`;

const Detail = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Message = styled.span`
  margin-top: 10px;
  background-color: ${(props) => (props.err ? "red" : "green")};
  color: white;
  padding: 8px;
  border-radius: 10px;
`;

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 380,
      laptop: 769,
      desktop: 1024,
    },
  },
});

const Profile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  console.log(theme.breakpoints.values);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${currentUser._id}`);
        console.log(res.data);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [currentUser]);

  const handleClick = (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      document
        .getElementById("passwordAgain")
        .setCustomValidity("passwords don't match!");
    } else {
      const user = {
        username,
        email,
        password,
      };
      try {
        updateUser(dispatch, currentUser._id, user);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 3000);
        setEmail("");
        setPassword("");
        setUsername("");
        setPasswordAgain("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <Left>
            <Text prof>User Profile</Text>
            <Text>Username</Text>
            <InputContainer>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="admin"
                required
              />
            </InputContainer>
            <Text>Email</Text>
            <InputContainer>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="admin@gmail.com"
                required
              />
            </InputContainer>
            <Text>Password</Text>
            <InputContainer>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password..."
                minLength="6"
                required
              />
            </InputContainer>
            <Text>Confirm Password</Text>
            <InputContainer>
              <Input
                onChange={(e) => setPasswordAgain(e.target.value)}
                type="password"
                placeholder="Password again..."
                id="passwordAgain"
                minLength="6"
                required
              />
            </InputContainer>
            <Button onClick={handleClick}>Update</Button>
            {message && <Message>Successfully Updated</Message>}
            {message && error && <Message err>Somethings Went Wrong!</Message>}
          </Left>
          <Right>
            <Text prof>My Orders</Text>
            <ThemeProvider theme={theme}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ width: { mobile: 150, tablet: 300, laptop: 800} }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>OrderId</TableCell>
                      <TableCell align="right">Date</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Paid</TableCell>
                      <TableCell align="right">Method</TableCell>
                      <TableCell align="right">Delivered</TableCell>
                      <TableCell align="right">Go Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow
                        key={order._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {order._id.slice(0,4)}...
                        </TableCell>
                        <TableCell align="right">
                          {moment(order.createdAt).subtract(10, 'days').calendar()}
                        </TableCell>
                        <TableCell align="right">${order.amount}</TableCell>
                        <TableCell align="right">
                          {order.paid ? "yes" : "no"}
                        </TableCell>
                        <TableCell align="right">
                          {order.paymentMethod}
                        </TableCell>
                        <TableCell align="right">{order.status}</TableCell>
                        <TableCell align="right">
                          <Detail to={`/orders/${order._id}`}>
                            <InfoOutlined />
                          </Detail>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ThemeProvider>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Profile;
