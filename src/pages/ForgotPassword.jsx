import React, { useState } from "react";
import Navbar from "../components/user/Navbar";
import { publicRequest } from "../requestMethods";
import {
  Button,
  Container,
  Form,
  Input,
  InputCon,
  Text,
  Wrapper,
} from "./Login";
import LoadingScreen from "../components/user/LoadingScreen";
import styled from "styled-components";
import { isEmail } from "../utils/validation";

export const Message = styled.div`
  width: 300px;
  border: ${(props) => (props.success ? "1px solid green" : "1px solid red")};
  color: ${(props) => (props.success ? " green" : "red")};
  padding: 5px;
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    if (!isEmail(email)) {
      setErrorMessage("Please enter a valid email!");
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
      return;
    }
    setLoading(true);
    try {
      const response = await publicRequest.post("/auth/forgotpassword", {
        email,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
      setEmail("");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Text big="true">Forgot Password</Text>
            <Text>Email</Text>
            <InputCon>
              <Input
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Please enter your email..."
                value={email}
                name="email"
              />
            </InputCon>
            <Button type="submit" disabled={loading}>
              Send
            </Button>
          </Form>
          {message && <Message success="true">{message}</Message>}
          {error && <Message>{error}</Message>}
          {errorMessage && <Message>{errorMessage}</Message>}
        </Wrapper>
      </Container>
    </>
  );
}
