import React from "react";
import styled from "styled-components";
import Review from "./Review";
import Rating from "@mui/material/Rating";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const ReviewCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border-bottom: 1px solid lightgray; */
  /* padding: 10px 5px; */
  z-index: 1;
  margin-top: 20px;
`;

const FirstLine = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  @media only screen and (max-width: 385px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;

const ReviewItem = styled.span`
  margin-right: 10px;
`;

const AddComment = styled.button`
  border: 1px solid lightgray;
  padding: 5px 15px;
  cursor: pointer;
  /* margin-left: 10px; */
  border-radius: 5px;
  font-weight: 500;
  font-size: 18px;
  &:hover {
    background-color: lightgray;
  }
`;
const Reviews = styled.div`
  height: 300px;
  width: 100%;
  overflow-y: scroll;
  margin-top: 10px;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(151, 151, 151);
  }
`;

const Caution = styled.div`
  border:1px solid red;
  color: red;
  padding: 5px;
  border-radius: 5px;
`;

const GoSingIn = styled(Link)`
  color: inherit;
`;



export default function Comments({ product, comments, avg, setOpen }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <ReviewCon>
        <FirstLine>
          {product.comments?.length > 0 && (
            <ReviewItem>{product.comments.length} Review:</ReviewItem>
          )}
          {avg !== null && (
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={avg}
                precision={0.5}
                readOnly
              />
            </Stack>
          )}
        </FirstLine>
        {currentUser ? (
          <AddComment onClick={() => setOpen(true)}>Add Review</AddComment>
        ) : (
          <Caution>
            Please <GoSingIn to="/login">login</GoSingIn> to post a comment
          </Caution>
        )}
      </ReviewCon>
      {comments?.length > 0 && (
        <Reviews>
          {comments.map((comment, i) => (
            <Review key={i} comment={comment} />
          ))}
        </Reviews>
      )}
    </>
  );
}
