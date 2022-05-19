import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, getClients } from "../../redux/apiCalls";
import moment from "moment";

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

const ShowDate = styled.div``;

const UsersList = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.client);

  const handleDelete = (id) => {
    deleteClient(id, dispatch);
  };

  useEffect(() => {
    getClients(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "username",
      headerName: "Username",
      minWidth: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Date of Registration",
      type: "string",
      width: 180,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            {clients.map(
              (i) =>
                i._id === params.row._id && (
                  <ShowDate>{moment(i.createdAt).subtract(10, 'days').calendar()}</ShowDate>
                )
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <ButtonCon onClick={() => handleDelete(params.row._id)}>
              <DeleteOutline />
            </ButtonCon>
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Wrapper>
        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          getRowId={(row) => row._id}
          checkboxSelection
          disableSelectionOnClick
        />
      </Wrapper>
    </Container>
  );
};

export default UsersList;
