import axios from "axios";

export const httpsAxios = axios.create({
  baseURL: "http://localhost:3000",
});
