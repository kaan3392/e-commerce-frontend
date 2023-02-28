import {
  loginFailure,
  loginStart,
  loginSuccess,
  updateUserSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductSuccess,
  deleteProductSuccess,
  errorWarning,
  fetchingStart,
  getProductSuccess,
  updateProductSuccess,
} from "./productRedux";
import { deleteClientSuccess, getClientSuccess } from "./clientRedux";

//login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data.message));
  }
};

//get products
export const getProducts = async (dispatch) => {
  dispatch(fetchingStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(errorWarning());
  }
};

//delete product
export const deleteProduct = async (id, dispatch) => {
  dispatch(fetchingStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(errorWarning());
  }
};

//update product
export const updateProduct = async (product, id, dispatch) => {
  dispatch(fetchingStart());
  try {
    await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(errorWarning());
  }
};

// add product
export const addProduct = async (product, dispatch) => {
  dispatch(fetchingStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(errorWarning());
  }
};

//get clients
export const getClients = async (dispatch) => {
  dispatch(fetchingStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getClientSuccess(res.data));
  } catch (err) {
    dispatch(errorWarning());
  }
};

//delete client
export const deleteClient = async (id, dispatch) => {
  dispatch(fetchingStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteClientSuccess(id));
  } catch (err) {
    dispatch(errorWarning());
  }
};

//update a user
export const updateUser = async (dispatch, id, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.put(`users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
    console.log(err)
  }
};
