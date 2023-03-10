import styled from "styled-components";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import moment from "moment";
import {  InfoOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  padding: 20px 50px;
  display: flex;
  @media only screen and (max-width: 768px) {
    padding: 20px 10px;
  }
  @media only screen and (max-width: 385px) {
    padding: 20px 5px;
  }
  
`;

const Text = styled.div`
  font-size: 18px;
  border-bottom: 1px solid lightgray;
  font-size: 24px;
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

const Right = styled.div`
  flex: 3;
  padding: 5px 5px 5px 15px;
`;

const columns = [
  { field: "_id", headerName: "ID", width: 240 },
  {
    field: "paid",
    headerName: "Paid",
    width: 100,
    renderCell: (params) => {
      return <div>{params.row.paid ? "yes" : "no"}</div>;
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    renderCell: (params) => {
      return <div>${params.row.amount}</div>;
    },
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.address.city} / {params.row.address.country}
        </div>
      );
    },
  },
  {
    field: "paymentMethod",
    headerName: " Method",
    description: "This column has a value getter and is not sortable.",
    width: 100,
    
  },
  {
    field: "status",
    headerName: " Status",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: " Date",
    width: 130,
    renderCell: (params) => {
      return (
        <div>
          {moment(params.row.createdAt).format("MMM Do YY")}
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 70,
    renderCell: (params) => {
      return (
        <>
          <div>
            <Link style={{color:"inherit"}} to={"/orders/"+ params.row._id}>
              <InfoOutlined  />
            </Link>
          </div>
        </>
      );
    },
  },
];

const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders`);
        console.log(res)
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
 
  return (
    <>
      <Container>
        <Wrapper>
          <Right>
            <Text>All Orders</Text>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={orders}
                columns={columns}
                pageSize={7}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Profile;
