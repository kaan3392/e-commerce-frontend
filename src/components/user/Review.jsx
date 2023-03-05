import Rating from "@mui/material/Rating";
import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  display: flex;
  
`;
const Wrapper = styled.div`
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  width: 90%;
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
  display: flex;
  align-items: center;
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

export default function Review({ comment }) {
  return (
    <Container>
      <Wrapper>
        <Name>{comment?.senderId?.username}</Name>
        <Time>{moment(comment.createdAt).fromNow()}</Time>
        <StarCon>
          <Star>
            <Rating name="read-only" value={comment.review} readOnly />
          </Star>
          <Title>{comment.title}</Title>
        </StarCon>
        <Desc>{comment.desc}</Desc>
      </Wrapper>
    </Container>
  );
}
