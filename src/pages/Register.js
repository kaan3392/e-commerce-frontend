import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import { publicRequest } from "../requestMethods";
import { Button, Container, Input, InputCon, Wrapper } from "./Login";

const Form = styled.form``;

const Text = styled.div`
  width: 100%;
  font-size: ${(props) => (props.register ? "30px" : "20px")};
  padding-bottom: ${(props) => props.register && "25px"};
  margin-bottom: 10px;
`;

const Login = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const LoginPage = styled(Link)`
  text-decoration: none;
  color: blue;
  font-size: 20px;
`;
export const MessageContainer = styled.div`
  position: fixed;
  background-color: red;
  padding: 5px;
  border-radius: 5px;
  bottom: 0;
  right: 0;
`;
export const Message = styled.span`
  color: white;
`;

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleSubmit = async (e) => {
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
        await publicRequest.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        setErrMsg(error.response.data);
        setTimeout(() => {
          setErrMsg(null);
          setUsername("")
          setEmail("")
          setPassword("")
          setPasswordAgain("")
        }, 3000);
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
            <Text register>Register</Text>
            <Text>Username</Text>
            <InputCon>
              <Input
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your Username..."
              />
            </InputCon>
            <Text>Email</Text>
            <InputCon>
              <Input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email..."
              />
            </InputCon>
            <Text>Password</Text>
            <InputCon>
              <Input
                required
                minLength="6"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your Password..."
              />
            </InputCon>
            <Text>Confirm Password</Text>
            <InputCon>
              <Input
                id="passwordAgain"
                required
                minLength="6"
                onChange={(e) => setPasswordAgain(e.target.value)}
                type="password"
                placeholder="Enter your Password..."
              />
            </InputCon>
            <Button>Register</Button>
            <Login>Do you already have an account? </Login>
            <LoginPage to="/login">Login</LoginPage>
          </Form>
        </Wrapper>
        {errMsg && (
          <MessageContainer>
            <Message>{errMsg}</Message>
          </MessageContainer>
        )}
      </Container>
    </>
  );
};

export default Register;
