import styled from "styled-components";
import Chart from "./Chart";
import { FileUpload } from "@mui/icons-material";
import { color } from "../../components/user/Navbar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";

const Container = styled.div`
  width: 100%;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  margin-top: 10px;
`;

const Frame = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 300px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.17);
  @media only screen and (max-width: 768px) {
    height: 190px;
    justify-content: space-between;
    padding: 20px;
  }
  @media only screen and (max-width: 385px) {
    padding: 10px;
    margin: 10px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const Value = styled.div`
  font-size: 16px;
`;

const Key = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const Bottom = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.17);
  @media only screen and (max-width: 385px) {
    flex-direction: column;
    margin: 10px;
  }
`;

const Left = styled.div`
  padding: 20px;
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 385px) {
    padding: 10px;
  }
`;

const Text = styled.div`
  color: gray;
  margin: 10px 0px;
`;

const InputCon = styled.div`
  width: 200px;
  border-bottom: 1px solid gray;
  padding: 5px 2px;
  @media only screen and (max-width: 768px) {
    width: 150px;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  &::placeholder {
    color: gray;
  }
`;

const Select = styled.select`
  width: 200px;
  padding: 3px;
  @media only screen and (max-width: 768px) {
    width: 150px;
  }
`;

const Options = styled.option``;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  @media only screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const ImageCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  object-fit: contain;
  @media only screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Button = styled.button`
  align-self: flex-start;
  color: white;
  width: 150px;
  padding: 5px;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${color};
  margin-top: 10px;
  &:hover {
    background-color: gray;
  }
  @media only screen and (max-width: 768px) {
    width: 100px;
  }
`;

const Icon = styled.label`
  cursor: pointer;
  svg {
    font-size: 30px;
    &:hover {
      color: red;
    }
  }
`;

const MiniCon = styled.div`
  margin-right: 10px;
  width: 300px;
  @media only screen and (max-width: 768px) {
    width: 200px;
  }
`;

const Message = styled.div`
  width: 300px;
  background-color: green;
  color: white;
  padding: 5px 7px;
  margin-top: 10px;
  border-radius: 5px;
  @media only screen and (max-width: 768px) {
    width: 200px;
  }
`;
const ChartCon = styled.div`
flex:1;
@media only screen and (max-width: 768px) {
    flex:2;
  }
@media only screen and (max-width: 385px) {
    display: none;
  }
`

const ProductUpdate = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const [productStat, setProductStat] = useState([]);
  const [file, setFile] = useState(null);
  const [color, setColor] = useState([]);
  const [inputs, setInputs] = useState({});
  const [loadingFile, setLoadingFile] = useState(false);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );
  const error = useSelector((state) => state.product.error);
  const pid = product._id.slice(0, 9);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const getStat = async () => {
      try {
        const res = await userRequest.get("orders/income/" + productId);
        console.log(res.data);
        res.data
          .sort((a, b) => a._id - b._id)
          .map((item) => {
            setProductStat((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], Sales: item.total },
            ]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getStat();
  }, [MONTHS, productId]);

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleClick = (e) => {
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
        console.log("Upload is " + progress + "% done");
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
          updateProduct(product, productId, dispatch);
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
      <Top>
        <ChartCon>
          <Chart
            data={productStat}
            height="300px"
            title="Sales Performance"
            dataKey="Sales"
            heightMed="190px"
          />
        </ChartCon>
        <Frame>
          <Item>
            <Image src={product.img} />
            <Title>{product.title}</Title>
          </Item>
          <Item>
            <Key>Id:</Key>
            <Value>{pid}...</Value>
          </Item>
          <Item>
            <Key>Category:</Key>
            <Value>{product.categories}</Value>
          </Item>
          <Item>
            <Key>Price:</Key>
            <Value>${product.price}</Value>
          </Item>
          <Item>
            <Key>Brand:</Key>
            <Value>{product.brand}</Value>
          </Item>
          <Item>
            <Key>In Stock:</Key>
            <Value>{product.inStock ? "true" : "false"}</Value>
          </Item>
        </Frame>
      </Top>
      <Bottom>
        <Wrapper>
          <Left>
            <MiniCon>
              <Text>Product Name</Text>
              <InputCon>
                <Input
                  onChange={handleChange}
                  name="title"
                  placeholder={product.title}
                />
              </InputCon>
            </MiniCon>
            <MiniCon>
              <Text>Price</Text>
              <InputCon>
                <Input
                  type="number"
                  onChange={handleChange}
                  name="price"
                  placeholder={product.price}
                />
              </InputCon>
            </MiniCon>
            <MiniCon>
              <Text>Color</Text>
              <InputCon>
                <Input
                  onChange={handleColor}
                  placeholder="put a period between them. red,blue,green..."
                />
              </InputCon>
            </MiniCon>
            <MiniCon>
              <Text>In Stock</Text>
              <Select onChange={handleChange} name="inStock">
                <Options selected disabled>
                  Please select one
                </Options>
                <Options value="true">yes</Options>
                <Options value="false">no</Options>
              </Select>
            </MiniCon>
            <MiniCon>
              <Text>Category</Text>
              <Select onChange={handleChange} name="categories">
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
            </MiniCon>
            <MiniCon>
              <Text>Brand</Text>
              <Select onChange={handleChange} name="brand">
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
            </MiniCon>
          </Left>
          <Right>
            <ImageCon>
              <ProductImage src={product.img} />
              <Icon htmlFor="input">
                <FileUpload />
              </Icon>
              <Input
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                icon
                id="input"
                type="file"
              />
            </ImageCon>
            <Button disabled={loadingFile} onClick={handleClick}>
              Upload
            </Button>
            {message && !error && (
              <Message>The product has been successfully updated</Message>
            )}
          </Right>
        </Wrapper>
      </Bottom>
    </Container>
  );
};

export default ProductUpdate;
