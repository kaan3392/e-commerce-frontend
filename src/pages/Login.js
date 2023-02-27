import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar, { color } from "../components/user/Navbar";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 40%;
  margin-top: 100px;
  @media only screen and (max-width: 385px) {
    width: 70%;
  }
`;

const Text = styled.div`
  width: 100%;
  font-size: ${(props) => (props.login ? "30px" : "20px")};
  padding-bottom: ${(props) => props.login && "25px"};
  margin-bottom: 10px;
`;

export const InputCon = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 90%;
  padding: 8px 2px;
  outline: none;
  border: none;
  margin-left: 2px;
  font-weight: 400;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100px;
  padding: 5px;
  display: block;
  background-color: ${color};
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px 0px;
  &:hover {
    background-color: gray;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: red;
  }
`;
const Register = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const RegisterPage = styled(Link)`
  text-decoration: none;
  color: blue;
  font-size: 20px;
`;
const Error = styled.div`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState(error);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    setTimeout(() => {
      setErrorMessage(false);
    }, 4000);
  };

  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <Text login>Login</Text>
          <Text>Email</Text>
          <InputCon>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your Email..."
            />
          </InputCon>
          <Text>Password</Text>
          <InputCon>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your Password..."
            />
          </InputCon>
          <Button disabled={isFetching} onClick={handleClick}>
            Login
          </Button>
          {errorMessage && <Error>Something went wrong..</Error>}
          <Register>Don't you have an account? </Register>
          <RegisterPage to="/register">Register</RegisterPage>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
