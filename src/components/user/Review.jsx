import Rating from "@mui/material/Rating";
import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  padding: 10px;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 385px) {
padding: 5px;
}
`;
const StarCon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media only screen and (max-width: 385px) {
flex-direction: column;
align-items: flex-start;
}
`;
const Star = styled.span`
  margin-right: 10px;
`;
const Name = styled.h4`
  margin-bottom: 10px;
`;
const Title = styled.span`
  font-weight: 500;
`;
const Desc = styled.p`
  margin-bottom: 10px;
`;
const Time = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

export default function Review({ c }) {
  return (
    <Container>
      <Name>{c.sender}</Name>
      <Time>{moment(c.createdAt).fromNow()}</Time>
      <StarCon>
        <Star>
          <Rating name="read-only" value={c.review} readOnly />
        </Star>
        <Title>{c.title}</Title>
      </StarCon>
      <Desc>{c.desc}</Desc>
    </Container>
  );
}
