import React from "react";
import styled from "styled-components";
import Review from "./Review";
import Rating from "@mui/material/Rating";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ReviewItem = styled.span`
  margin-right: 10px;
`;

const ReviewCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 10px 5px;
  z-index: 1;
`;

const AddComment = styled.button`
  border: none;
  box-shadow: 0px 0px 11px -5px rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  background: linear-gradient(to right, #283c86, #45a247);
  border-radius: 5px;
  font-weight: 500;
  &:hover {
    background-color: lightgray;
  }
`;
const Reviews = styled.div`
  height: 350px;
  width: 100%;
  overflow-y: scroll;
  margin-top: 10px;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f3f3f3;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;

const Caution = styled.div`
  background-color: red;
  color: white;
  padding: 5px;
  border-radius: 5px;
`;

const GoSingIn = styled(Link)`
  color: inherit;
`;

const FirstLine = styled.div`
  display: flex;
  margin-bottom: 10px;
  @media only screen and (max-width: 385px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
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
          {comments.map((c, i) => (
            <Review key={i} c={c} />
          ))}
        </Reviews>
      )}
    </>
  );
}
