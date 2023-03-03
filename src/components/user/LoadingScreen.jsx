import styled from "styled-components";

const Container = styled.div`
   width: 100%;
  display: flex;
  min-height: calc(100vh - 99px);
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  align-content: center;
  justify-content: center;
`;

const Balls = styled.div`
  display: flex;
  align-items: center;
`;

const Ball = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: gray;
  margin-right: 10px;
  animation: ball 0.5s ease infinite alternate;
  animation-delay: ${(props) =>
    props.delay === "ball2" ? "0.15s" : props.delay === "ball3" ? "0.3s" : ""};

  @keyframes ball {
    to {
      transform: translateY(-20px);
    }
  }
`;

export default function LoadingScreen() {
  return (
    <Container>
      <Balls>
        <Ball />
        <Ball delay="ball2"></Ball>
        <Ball delay="ball3"></Ball>
      </Balls>
    </Container>
  );
}
