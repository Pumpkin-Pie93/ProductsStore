import axios from "axios"

export const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  // withCredentials: true,
  headers: {
	"Content-Type":"application/json",
  },
})