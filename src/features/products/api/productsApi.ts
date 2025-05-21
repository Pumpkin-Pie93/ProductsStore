import {instance} from "@/common/instance/instance"
import type {GetAllProductsResponse, Product } from "../types/productsApi.types.ts"

export const productsApi = {
  getAllProducts(){
	return instance.get<GetAllProductsResponse>("/products")
  },
  getProductById(id:number){
	return instance.get<Product>(`/products/${id}`)
  },
  addNewProduct(data:Product){
	return instance.post('/products',data)
  },
  updateProduct(data:Product){
	return instance.put(`/products/${data.id}`,data)
  },
  deleteProduct(id:number){
	return instance.delete(`/products/${id}`)
  }
}