import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 50vh;
  margin: 50px 0px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
`;
const Top = styled.div`
  display: flex;
  gap: 20px;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const TopContainer = styled.div`
display: flex;
flex: 1;
gap: 20px;
  @media only screen and (max-width: 480px) {
    flex-direction: ${props => props.long && "column"};
  }
`;
const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: justify;
  font-size: 14px;

  h1 {
    font-size: 18px;
    font-weight: 500;
    color: #555;
  }

  span,
  div {
    color: gray;
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 26px;
`;
const Copyright = styled.div`
  margin-left: 20px;
  font-size: 12px;
  color: gray;
`;
const Right = styled.div`
display: flex;
align-items: center;
justify-content: center;
  img {
    height: 50px;
    @media only screen and (max-width: 480px) {
    width: 80%;
  }
  }
`;
const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Top>
          
          <TopContainer>
            <Item>
              <h1>Categories</h1>
              <span>Laptops</span>
              <span>Phones</span>
              <span>Television</span>
              <span>Tablet</span>
              <span>Camera</span>
              <span>Watch</span>
            </Item>
            <Item>
              <h1>Links</h1>
              <span>FAQ</span>
              <span>Pages</span>
              <span>Stores</span>
              <span>Compare</span>
              <span>Cookies</span>
            </Item>
          </TopContainer>
          <TopContainer long={true}>
            <Item>
              <h1>About</h1>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore cupiditate optio, velit magnam neque fuga sequi
                consequuntur quod deserunt ab alias, tenetur, architecto saepe
                quos totam amet harum quasi nobis!
              </div>
            </Item>
            <Item>
              <h1>Contact</h1>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                magni eum quia recusandae quis sint inventore nulla autem sequi
                mollitia.
              </div>
            </Item>
          </TopContainer>
        </Top>
        <Bottom>
          <Left>
            <Logo>Shop.</Logo>
            <Copyright>© Copyright 2023. All Rights Reserved</Copyright>
          </Left>
          <Right>
            <img src="/image/payment.png" alt="" />
          </Right>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Footer;
