import { Upload } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { color } from "../../components/user/Navbar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media only screen and (max-width: 385px) {
    flex-direction: column;

  }
`;

const Item = styled.div`
  width: 40%;
  margin-bottom: 15px;
  @media only screen and (max-width: 385px) {
    width: 80%;

  }
`;

const Text = styled.div`
  font-size: ${(props) => (props.title ? "30px" : "20px")};
  font-weight: ${(props) => props.title && "600"};
  margin-bottom: ${(props) => (props.title ? "20px" : "5px")};
`;

const InputArea = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 90%;
  outline: none;
  border: none;
  padding: 10px 5px;
  margin-left: 2px;
  display: ${(props) => props.icon && "none"};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 5px;
  border-radius: 5px;
`;

const Options = styled.option``;

const Button = styled.button`
  cursor: pointer;
  width: 100px;
  background-color: ${color};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
  &:disabled {
    color: tomato;
    cursor: not-allowed;
  }
`;

const Icon = styled.label`
  cursor: pointer;
  svg {
    &:hover {
      color: red;
    }
  }
`;

const Message = styled.div`
  width: 300px;
  background-color: green;
  color: white;
  padding: 5px 7px;
  margin-top: 10px;
  border-radius: 5px;
`;

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [color, setColor] = useState([]);
  const [percentage, setPercentage] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.product);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingFile(true);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, color };
          addProduct(product, dispatch);
          setMessage(true);
          setLoadingFile(false);
          setInputs({});
          setColor([]);
          setFile(null);
          setTimeout(() => {
            setMessage(false);
          }, 3000);
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Text title>New Product</Text>
        <Form onSubmit={handleSubmit}>
          <Item>
            <Text>Image</Text>
            <Icon htmlFor="input">
              <Upload />
            </Icon>
            <Input
              onChange={(e) => setFile(e.target.files[0])}
              icon
              id="input"
              type="file"
            />
          </Item>
          <Item>
            <Text>Title</Text>
            <InputArea>
              <Input
                name="title"
                onChange={handleChange}
                placeholder="title..."
              />
            </InputArea>
          </Item>
          <Item>
            <Text>Desc</Text>
            <InputArea>
              <Input
                name="desc"
                onChange={handleChange}
                placeholder="desc..."
              />
            </InputArea>
          </Item>
          <Item>
            <Text>Price</Text>
            <InputArea>
              <Input
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="$123..."
              />
            </InputArea>
          </Item>
          <Item>
            <Text>Color</Text>
            <InputArea>
              <Input
                onChange={handleColor}
                placeholder="put a period between them. red,blue,green..."
              />
            </InputArea>
          </Item>
          <Item>
            <Text>In Stock</Text>
            <Select name="inStock" onChange={handleChange}>
              <Options selected disabled>
                Please select one
              </Options>
              <Options value="true">Yes</Options>
              <Options value="false">No</Options>
            </Select>
          </Item>
          <Item>
            <Text>Category</Text>
            <Select name="categories" onChange={handleChange}>
              <Options selected disabled>
                Please select one
              </Options>
              <Options value="laptop">Laptop</Options>
              <Options value="watch">Watch</Options>
              <Options value="tablet">Tablet</Options>
              <Options value="phone">Phone</Options>
              <Options value="camera">Camera</Options>
              <Options value="television">Television</Options>
            </Select>
          </Item>
          <Item>
            <Text>Brand</Text>
            <Select name="brand" onChange={handleChange}>
              <Options selected disabled>
                Please select one
              </Options>
              <Options value="apple">Apple</Options>
              <Options value="canon">Canon</Options>
              <Options value="samsung">Samsung</Options>
              <Options value="asus">Asus</Options>
              <Options value="dell">Dell</Options>
              <Options value="lenovo">Lenovo</Options>
            </Select>
          </Item>
          <Item>
            <Button disabled={loadingFile} type="submit">
              Create
            </Button>
          </Item>
        </Form>
        {loadingFile && <Message>{percentage}</Message>}
        {message && !error && (
          <Message>The product has been successfully added</Message>
        )}
      </Wrapper>
    </Container>
  );
};

export default NewProduct;
