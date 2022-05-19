import { Close } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { color } from "./Navbar";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 110vh;
  background-color: black;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
`;

const Wrapper = styled.div`
  width: 50%;
  background: linear-gradient(to right, #283c86, #45a247);
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: 50vh;
  margin-top: 100px;
  position: relative;
  border-radius: 5px;
  @media only screen and (max-width: 768px) {
    width: 75%;
  }
`;

const Text = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  padding: 5px;
  height: 150px;
  margin-bottom: 10px;
`;

const Send = styled.button`
  width: 120px;
  padding: 10px 10px;
  align-self: flex-end;
  cursor: pointer;
  background-color: ${color};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
`;

const CloseSign = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  svg {
    &:hover {
      color: red;
    }
  }
`;

const AddReview = ({ setOpen, id, setFireComments, fireComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const comment = {
    title,
    desc,
    review: value,
    productId: id,
    sender: currentUser.username,
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await userRequest.post("/comments", comment);
      setOpen(false);
      setFireComments(!fireComments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Text>Rate it</Text>
        <Rating
          style={{ marginBottom: "10px" }}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Text>Title</Text>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a Title..."
        />
        <Text>Description</Text>
        <TextArea
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Add a Desc..."
        ></TextArea>
        <Send onClick={handleClick}>Add Review</Send>
        <CloseSign onClick={() => setOpen(false)}>
          <Close />
        </CloseSign>
      </Wrapper>
    </Container>
  );
};

export default AddReview;
