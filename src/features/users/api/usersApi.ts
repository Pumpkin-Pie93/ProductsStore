import { instance } from "@/common/instance/instance.js"
import type {User} from "../types/users.types.ts"

export const usersApi = {
  getAllUsers(){
	return instance.get<User[]>('/users')
  },
  getUserById(id:number){
	return instance.get<User>(`/users/${id}`)
  },
  addNewUser(data:User){
	return instance.post<User>('/users', data)
  },
  updateUser({data, id}: {id:number,data: User}){
	return instance.put<User>(`/users/${id}`, data)
  },
  deleteUser(id:number){
	return instance.delete<void>(`/users/${id}`)
  }
}