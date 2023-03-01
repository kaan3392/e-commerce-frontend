import styled from "styled-components";

const Container = styled.div`
  margin: 100px 200px 20px 200px;
`;
const Top = styled.div`
  display: flex;
  gap: 50px;
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

  span {
    color: gray;
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
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
  img {
    height: 50px;
  }
`;
const Footer = () => {
  return (
    <Container className="footer">
      <Top className="top">
        <Item className="item">
          <h1>Categories</h1>
          <span>Laptops</span>
          <span>Phones</span>
          <span>Television</span>
          <span>Tablet</span>
          <span>Camera</span>
          <span>Watch</span>
        </Item>
        <Item className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </Item>
        <Item className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            cupiditate optio, velit magnam neque fuga sequi consequuntur quod
            deserunt ab alias, tenetur, architecto saepe quos totam amet harum
            quasi nobis!
          </span>
        </Item>
        <Item className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod magni
            eum quia recusandae quis sint inventore nulla autem sequi mollitia.
          </span>
        </Item>
      </Top>
      <Bottom className="bottom">
        <Left className="left">
          <Logo className="logo">Shop.</Logo>
          <Copyright className="copyright">
            © Copyright 2023. All Rights Reserved
          </Copyright>
        </Left>
        <Right className="right">
          <img src="/image/payment.png" alt="" />
        </Right>
      </Bottom>
    </Container>
  );
};

export default Footer;
