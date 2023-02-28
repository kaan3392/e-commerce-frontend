import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/user/Menu";
import Navbar from "../components/user/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { color } from "../constant/colors";
import { isEmail } from "../utils/validation";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import { publicRequest } from "../requestMethods";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  padding: 50px;
  border-radius: 20px;
  border: 0.5px solid lightgray;
  @media only screen and (max-width: 385px) {
    padding: 30px;
  }
`;

const Form = styled.form``;

export const Text = styled.div`
  width: 100%;
  font-size: ${(props) => (props.big ? "30px" : "20px")};
  padding-bottom: ${(props) => props.big && "25px"};
  margin-bottom: 10px;
  text-align: ${(props) => props.big && "center"};
`;

export const InputCon = styled.div`
  width: 100%;
  min-width: 300px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 0px;
  outline: none;
  border: none;
  border-bottom: 1px solid lightgray;
  font-weight: 300;
  font-size: 14px;
  background-color: inherit;
  &:invalid {
    border-bottom: 1px solid red;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  display: block;
  background-color: ${color};
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin: 20px 0px;
  border: none;
  &:hover {
    background-color: gray;
  }
  &:disabled {
    cursor: not-allowed;
  }
  ${InputCon}:hover && {
    background-color: red;
  }
`;

const Register = styled(Link)`
  font-weight: 300;
  color: inherit;
  margin-top: 20px;
  display: block;
`;

export const ForgotPassword = styled(Link)`
  font-weight: lighter;
  display: block;
  color: inherit;
  margin-top: 20px;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  font-weight: lighter;
`;

const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { isFetching, error } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(user.email)) {
      setErrorMessage("Lütfen geçerli bir mail giriniz.");
      setTimeout(() => {
        setErrorMessage(false);
      }, 2000);
      setUser({ email: "", password: "" });
      return;
    }
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log("err***********", err);
      dispatch(loginFailure(err.response.data.message));
      setErrorMessage(error);
    } finally {
      setUser({ email: "", password: "" });
      setTimeout(() => {
        setErrorMessage(false);
      }, 2000);
    }
  };

  console.log(error);
  return (
    <>
      <Navbar />
      <Menu />
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Text big>Login</Text>
            <Text>email</Text>
            <InputCon>
              <Input
                required
                onChange={handleChange}
                type="email"
                placeholder="enter your email..."
                value={user.email}
                name="email"
              />
            </InputCon>
            <Text>password</Text>
            <InputCon>
              <Input
                required
                minLength="6"
                onChange={handleChange}
                type="password"
                placeholder="enter your password..."
                value={user.password}
                name="password"
              />
            </InputCon>
            <Button disabled={isFetching} type="submit">
              Login
            </Button>
          </Form>
          {errorMessage && <Error>{errorMessage}</Error>}
          <Register to="/register">Don't you have an account? </Register>
          <ForgotPassword to="/register">Forgot password?</ForgotPassword>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
