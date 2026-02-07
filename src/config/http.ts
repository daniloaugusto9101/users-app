import axios from "axios"
// import env from "./env";

const api = axios.create({
  baseURL: "http://localhost:3333/api/v1.0",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
