import {instance} from "@/common/instance/instance"
import { Cart } from "../types/carts.types"

export const cartsApi = {
  getAllCarts(){
	return instance.get<Cart[]>('/carts')
  },
  getCartById(id:number){
	return instance.get<Cart>(`/carts/${id}`)
  },
  addNewCart(data:Cart){
	return instance.post<Cart>('/carts', data)
  },
  updateCart({data, id}: {id:number,data: Cart}){
	return instance.put<Cart>(`/carts/${id}`, data)
  },
  deleteCart(id:number){
     return instance.delete<void>(`/carts/${id}`)
  }
}