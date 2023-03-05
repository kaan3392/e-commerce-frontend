import axios from "axios";

const BASE_URL = process.env.REACT_APP_NODE_ENV === "development"
? "http://localhost:8800/api"
: "https://tan-embarrassed-elephant.cyclic.app/api";


let TOKEN = "";
const temp = localStorage.getItem("persist:root");



if (temp) {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currentUser?.access_token;
}
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});
