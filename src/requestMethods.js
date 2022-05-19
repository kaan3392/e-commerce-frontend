import axios from "axios";

const BASE_URL = "http://localhost:8800/api/";
let TOKEN = "";
const temp = localStorage.getItem("persist:root");
if (temp) {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currentUser?.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
