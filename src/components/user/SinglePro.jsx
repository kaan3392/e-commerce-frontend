import styled from "styled-components";
import { color } from "../../constant/colors";
import AddReview from "./AddReview";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";
import LoadingScreen from "./LoadingScreen";
import Comments from "./Comments";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 99px);
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
`;

const Left = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    height: 300px;
  }
`;

const ImageWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    height: 100%;
  }
`;

const LittleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    height: 30%;
    width: 100%;
    justify-content: space-around;
  }
`;

const LittleImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`;

const BigImageContainer = styled.div`
  flex: 4;
  height: 100%;
  @media only screen and (max-width: 768px) {
    height: 70%;
    width: 100%;
  }
`;

const BigImage = styled.img`
  width: 100%;
  object-fit: contain;
  height: 100%;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const Center = styled.div`
  flex: 1;
`;

const Item = styled.div`
  width: 100%;
  font-size: ${(props) => (props.title ? "24px" : "16px")};
  display: ${(props) => props.c && "flex"};
  font-weight: ${(props) => (props.title ? "600" : "400")};
  border-bottom: ${(props) => (props.button ? "none" : " 1px solid lightgray")};
  padding: 15px 10px;
  display: ${(props) => props.button && "flex"};
  text-align: ${(props) => props.title && "center"};
  box-sizing: border-box;

  @media only screen and (max-width: 480px) {
    padding: 10px;
  }

  span {
    font-size: ${(props) => props.price && "20px"};
  }
`;
const InStock = styled.span`
  color: ${(props) => (props.status ? "limegreen" : "red")};
`;
const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
`;

const Cart = styled.div`
  width: 90%;
  border: 1px solid lightgray;
  overflow: hidden;
  max-width: 250px;
`;

const Select = styled.select`
  padding: 5px 10px;
  margin-left: 5px;
  font-size: 15px;
  @media only screen and (max-width: 480px) {
    padding: 3px;
    font-size: 12px;
  }
`;

const Options = styled.option`
  padding: 10px;
`;

const Button = styled.button`
  padding: 8px 10px;
  width: 100%;
  background-color: ${color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  outline: none;
  &:hover {
    background-color: gray;
  }
`;

const ColorCon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.c};
  opacity: ${(props) => (props.a ? "" : "0.5")};
  padding: ${(props) => props.a && "2px"};
  cursor: pointer;
  &:hover {
    transform: scale(1.15);
  }
`;

const Message = styled.div`
  cursor: pointer;
  border: ${(props) => (props.success ? "1px solid green" : "1px solid red")};
  margin-top: 10px;
  color: ${(props) => (props.success ? "green" : "red")};
  padding: 5px;
  text-align: center;
  align-self: center;
  width: 80%;
`;
const Bottom = styled.div`
  width: 100%;
`;

const SinglePro = ({ id }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [colorError, setColorError] = useState(false);
  const [avg, setAvg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [fireComments, setFireComments] = useState(false);
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
        setAvg(
          res.data.comments?.reduce(
            (acc, curr) => (acc = acc + curr.review),
            0
          ) / res.data.comments?.length
        );
        setComments(
          res.data.comments?.sort((a, b) => b.createdAt - a.createdAt)
        );
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id, fireComments]);

  const handleClick = () => {
    if (color === null) {
      setColorError(true);
      setTimeout(() => {
        setColorError(false);
      }, 2000);
    } else {
      dispatch(addProduct({ ...product, quantity, color }));
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 2000);
      setColor(null);
    }
  };

  useEffect(() => {
    dispatch({ type: "DARKER_OFF" });
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoading && error) {
    return <p>Something went wrong</p>;
  }

  return (
    <Container open={open}>
      {open && (
        <AddReview
          setFireComments={setFireComments}
          fireComments={fireComments}
          id={id}
          setOpen={setOpen}
        />
      )}
      <Wrapper>
        <Top>
          <Left>
            <ImageContainer>
              <ImageWrapper>
                <LittleImageContainer>
                  {product?.img?.map((item, i) => (
                    <LittleImage
                      onClick={() => setIndex(i)}
                      key={i}
                      src={item}
                    />
                  ))}
                </LittleImageContainer>
                <BigImageContainer>
                  <BigImage src={product?.img?.[index]} />
                </BigImageContainer>
              </ImageWrapper>
            </ImageContainer>
            <Center>
              <Item title>{product.title}</Item>
              <Item>Desciription : {product.desc}</Item>
            </Center>
          </Left>
          <Right>
            <Cart>
              <Item>Price: {product.price}$</Item>
              <Item >
                In Stock: <InStock status={product.inStock}>{product.inStock ? "yes" : "no"}</InStock>
              </Item>
              <Item c>
                <span style={{ marginRight: "10px" }}>Color:</span>
                <ColorCon>
                  {product.color?.map((c, i) => (
                    <Color
                      a={color === c && "a"}
                      key={i}
                      c={c}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </ColorCon>
              </Item>
              <Item>
                Quantity:
                <Select onChange={(e) => setQuantity(Number(e.target.value))}>
                  <Options value="1">1</Options>
                  <Options value="2">2</Options>
                  <Options value="3">3</Options>
                  <Options value="4">4</Options>
                  <Options value="5">5</Options>
                </Select>
              </Item>
              <Item price>
                Total: <span>{product.price * Number(quantity)}$</span>
              </Item>
              <Item button>
                <Button onClick={handleClick}>Add To Cart</Button>
              </Item>
            </Cart>
            {colorError && (
              <Message onClick={() => setColorError(false)}>
                Please select a color
              </Message>
            )}
            {message && <Message success>Added to Cart</Message>}
          </Right>
        </Top>
        <Bottom>
          <Comments
            product={product}
            comments={comments}
            avg={avg}
            setOpen={setOpen}
          />
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default SinglePro;
