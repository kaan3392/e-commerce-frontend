import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import { publicRequest } from "../requestMethods";
import {
  Button,
  Container,
  Input,
  InputCon,
  Wrapper,
  ForgotPassword,
  Text,
} from "./Login";

const Form = styled.form``;

const Login = styled(Link)`
  color: inherit;
  font-weight: 300;
`;

export const Message = styled.span`
  color: red;
  font-weight: lighter;
`;

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    console.log(passwordAgain);
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
        await publicRequest.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        setErrorMessage(error.response.data.message);
      } finally {
        setTimeout(() => {
          setErrorMessage(null);
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordAgain("");
        }, 2000);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Text big>Register</Text>
            <Text>username</Text>
            <InputCon>
              <Input
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your Username..."
                value={username}
              />
            </InputCon>
            <Text>email</Text>
            <InputCon>
              <Input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email..."
                value={email}
              />
            </InputCon>
            <Text>password</Text>
            <InputCon>
              <Input
                required
                minLength="6"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your Password..."
                value={password}
              />
            </InputCon>
            <Text>confirm password</Text>
            <InputCon>
              <Input
                id="passwordAgain"
                required
                minLength="6"
                onChange={(e) => setPasswordAgain(e.target.value)}
                type="password"
                placeholder="Enter your Password..."
                value={passwordAgain}
              />
            </InputCon>
            <Button>Register</Button>
          </Form>
          {errorMessage && <Message>{errorMessage}</Message>}
          <Login to="/login">Do you already have an account? </Login>
          <ForgotPassword to="/login">Forgot password?</ForgotPassword>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
