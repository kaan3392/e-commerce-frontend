import styled from "styled-components";

const Container = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
height: 50px;
`;
const Text = styled.div`
font-size: 16px;
span{
    font-weight: 500;
}
`;

const Footer = () => {
  return (
    <Container>
      <Text>Copyright © <span>knlcl</span></Text>
    </Container>
  );
};

export default Footer;
