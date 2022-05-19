import styled from "styled-components";
import { color } from "./Navbar";
import Review from "./Review";
import Rating from "@mui/material/Rating";
import { Stack } from "@mui/material";
import AddReview from "./AddReview";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  padding: 70px 120px;
  display: flex;
  @media only screen and (max-width: 768px) {
    padding: 50px 20px;
  }
  @media only screen and (max-width: 385px) {
    padding: 50px 10px;
  }
`;

const Top = styled.div`
  display: flex;
`;

const MainCon = styled.div`
  display: flex;
  flex: 2;
  @media only screen and (max-width: 768px) {
    flex: 1;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const ImageCon = styled.div`
  box-shadow: 0px 0px 11px -5px rgba(0, 0, 0, 0.17);
  margin-right: 10px;
  padding: 30px;
  @media only screen and (max-width: 768px) {
    margin-right: 5px;
    width: 200px;
  }
  @media only screen and (max-width: 385px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  display: ${(props) => props.little && "none"};
  @media only screen and (max-width: 768px) {
    margin-right: 5px;
    width: 200px;
  }
  @media only screen and (max-width: 385px) {
    width: ${(props) => props.little && "35px"};
    height: ${(props) => props.little && "35px"};
    border-radius: ${(props) => props.little && "50%"};
    display: ${(props) => props.little && "block"};
  }
`;

const Center = styled.div`
  flex: 1;
  padding-left: 20px;
  @media only screen and (max-width: 768px) {
    padding-left: 10px;
  }
  @media only screen and (max-width: 385px) {
    padding-left: 0px;
  }
`;

const Item = styled.div`
  font-size: ${(props) => (props.title ? "24px" : "16px")};
  display: ${(props) => props.c && "flex"};
  font-weight: ${(props) => (props.title ? "600" : "400")};
  border-bottom: ${(props) => (props.button ? "none" : " 1px solid lightgray")};
  padding: 15px 5px;
  display: ${(props) => props.button && "flex"};
  align-items: ${(props) => props.button && "center"};
  justify-content: ${(props) => props.button && "center"};
  span {
    color: ${(props) => props.status && "limegreen"};
    font-size: ${(props) => props.price && "20px"};
  }
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const Cart = styled.div`
  width: 250px;
  border: 1px solid lightgray;
  margin-left: 50px;
  @media only screen and (max-width: 768px) {
    width: 200px;
    margin-left: 10px;
  }
  @media only screen and (max-width: 385px) {
    width: 180px;
  }
`;

const Select = styled.select`
  padding: 5px 10px;
  margin-left: 5px;
  font-size: 15px;
  @media only screen and (max-width: 768px) {
    padding: 3px;
    font-size: 12px;
  }
`;

const Options = styled.option`
  padding: 10px;
  @media only screen and (max-width: 768px) {
    padding: 3px;
  }
`;

const Button = styled.button`
  padding: 8px 10px;
  width: 80%;
  background-color: ${color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
`;

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

const GoBack = styled.button`
  position: absolute;
  padding: 9px 18px;
  background-color: ${color};
  color: white;
  top: 70px;
  left: 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  &:hover {
    background-color: gray;
  }
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

const ColorCon = styled.div`
  display: flex;
  align-items: center;
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: ${(props) => props.a && "50%"};
  background-color: ${(props) => props.c};
  border: ${(props) => props.a && "2px solid tomato"};
  transform: ${(props) => props.a && "scale(1.15)"};
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.15);
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

const Message = styled.div`
  cursor: pointer;
  border: none;
  margin-top: 10px;
  color: white;
  background-color: ${(props) => (props.success ? "green" : "red")};
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  align-self: center;
  @media only screen and (max-width: 768px) {
    width: 150px;
  }
  @media only screen and (max-width: 385px) {
    width: 120px;
  }
`;

const ImgText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SinglePro = ({ id }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [colorError, setColorError] = useState(false);
  const [avg, setAvg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [fireComments, setFireComments] = useState(false);
  const [message, setMessage] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //get product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data);
        console.log(res.data);
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

  return (
    <Container>
      {open && (
        <AddReview
          setFireComments={setFireComments}
          fireComments={fireComments}
          id={id}
          setOpen={setOpen}
        />
      )}
      <GoBack onClick={() => navigate(-1)}>Go Back</GoBack>
      <Wrapper>
        <Top>
          <MainCon>
            <Left>
              <ImageCon>
                <Image src={product.img} />
              </ImageCon>
            </Left>
            <Center>
              <ImgText>
                <Item title>{product.title}</Item>
                <Image little src={product.img} />
              </ImgText>
              <Item>Desciription : {product.desc}</Item>
              <ReviewCon>
                <FirstLine>
                  {product.comments?.length > 0 && (
                    <ReviewItem>{product.comments?.length} Review:</ReviewItem>
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
                  <AddComment onClick={() => setOpen(true)}>
                    Add Review
                  </AddComment>
                ) : (
                  <Caution>
                    Please <GoSingIn to="/login">sign</GoSingIn> in to write a
                    review
                  </Caution>
                )}
              </ReviewCon>
              {comments.length > 0 && (
                <Reviews>
                  {comments.map((c, i) => (
                    <Review key={i} c={c} />
                  ))}
                </Reviews>
              )}
            </Center>
          </MainCon>
          <Right>
            <Cart>
              <Item>Price: {product.price}$</Item>
              <Item status>
                In Stock: <span>{product.inStock ? "yes" : "no"}</span>
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
      </Wrapper>
    </Container>
  );
};

export default SinglePro;
