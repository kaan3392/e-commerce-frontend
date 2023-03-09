import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import { publicRequest } from "../requestMethods";
import { Message } from "./ForgotPassword";
import {
  Button,
  Container,
  Form,
  Input,
  InputCon,
  Text,
  Wrapper,
} from "./Login";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = search.split("=");

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() !== passwordAgain.trim()) {
      setErrorMessage("passwords don't match!");
      setTimeout(() => {
        setErrorMessage("")
      }, 2000);
    } else {
      try {
        const response = await publicRequest.put(
          `/auth/resetpassword?resetPasswordToken=${token[1]}`,
          { password }
        );
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 2000);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          navigate("/register");
        }, 2000);
      } finally {
        setTimeout(() => {
          setErrorMessage(null);
          setPassword("");
          setPasswordAgain("");
        }, 3000);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Text big="true">Reset Password</Text>
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
            <Button type="submit">Send</Button>
          </Form>
          {errorMessage && <Message>{errorMessage}</Message>}
          {message && <Message success="true">{message}</Message>}
        </Wrapper>
      </Container>
    </>
  );
}
