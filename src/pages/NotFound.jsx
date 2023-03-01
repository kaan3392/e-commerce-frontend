import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 99px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
`;

const Text = styled.div`
  font-size: 25px;
`;

const Home = styled(Link)`
  color: inherit;
  font-size: 25px;
`;

export default function NotFound() {
  return (
    <Container>
      <Wrapper>
        <Image src="/image/hire_me.jpeg" alt="" />
        <Text>or</Text>
        <Home to="/">Go to Homepage</Home>
      </Wrapper>
    </Container>
  );
}
