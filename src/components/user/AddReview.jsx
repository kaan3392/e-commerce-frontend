import { Close } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { color } from "../../constant/colors";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
`;
const InnerContainer = styled.div`
  position: sticky;
  top: 150px;
  width: 50%;
  margin: auto;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: 50vh;
  margin-top: 100px;
  position: relative;
  border-radius: 5px;
`;

const Text = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 5px;
  height: 150px;
  margin-bottom: 10px;
  outline: none;
`;

const SendContainer = styled.button`
display: flex;
align-items: center;
justify-content: space-between;
background-color: inherit;
border: none;
outline: none;
`;

const Send = styled.button`
width: 120px;
padding: 5px 10px;
display: inline;
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

const Message = styled.div`
color: red;
border: 1px solid red;
margin-right: 10px;
font-weight: 500;
padding: 3px 5px;
`;

const AddReview = ({ setOpen, id, setFireComments, fireComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);

  const comment = {
    title,
    desc,
    review: value,
    productId: id,
    senderId: currentUser.data.id,
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || desc.trim() === "" || value === null) {
      setError("Please fill in all fields");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    try {
      await userRequest.post("/comments", comment);
      setFireComments(!fireComments);
    } catch (err) {
      setError(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Container>
      <InnerContainer>
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
          <SendContainer>
            <Send onClick={handleClick}>Add Review</Send>
            {error && <Message>{error}</Message>}
          </SendContainer>
          <CloseSign onClick={() => setOpen(false)}>
            <Close />
          </CloseSign>
        </Wrapper>
      </InnerContainer>
    </Container>
  );
};

export default AddReview;
