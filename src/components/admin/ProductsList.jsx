import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { color } from "../../constant/colors";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { DeleteIcon } from "../../constant/icons";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 10px 0px;
  width: 90%;
  height: 500px;
`;

const ButtonCon = styled.div`
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;

const Button = styled.button`
  background-color: ${color};
  color: white;
  cursor: pointer;
  width:${props => props.main && "100px"} ;
  border-radius: 5px;
  padding: 4px 8px;
  margin-right: 10px;
  border: none;
  &:hover {
    background-color: gray;
  }
  @media only screen and (max-width: 385px) {
    width:${props => props.main && "70px"} ;
margin-right: 0;
  }
`;

const Icon = styled.div`
display: flex;
align-items: center;
svg{
  width: 18px;
  height: 18px;
}`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: contain;
  margin-right: 10px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-bottom: 10px;
  @media only screen and (max-width: 385px) {
padding: 5px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 25px;
  @media only screen and (max-width: 385px) {
font-size: 20px;
  }
`;

const UsersList = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.product);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  useEffect(() => {
    getProducts(dispatch)
  },[dispatch])

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      sortable: true,
      width: 250,
      renderCell: (params) => {
        return (
          <User>
            <Image src={params.row.img} alt="" />
            {params.row.title}
          </User>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 190,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <ButtonCon>
              <Link to={"/admin/product/"+ params.row._id}>
                <Button>Edit</Button>
              </Link>
              <Icon onClick={() => handleDelete(params.row._id)}>
                <DeleteIcon />
              </Icon>
            </ButtonCon>
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Wrapper>
      <Main>
        <Title >Product List</Title>
        <Link to="/newproduct">
          <Button main>Create</Button>
        </Link>
      </Main>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={7}
          getRowId={row => row._id}
          rowsPerPageOptions={[7]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Wrapper>
    </Container>
  );
};

export default UsersList;
