import axios from "axios"

export const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  withCredentials: true,
  // headers: {
	// "API-KEY": "1cdd9f77-c60e-4af5-b194-659e4ebd5d41",
  // },
})