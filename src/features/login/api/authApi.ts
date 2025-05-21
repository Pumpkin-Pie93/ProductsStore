import {instance} from "@/common/instance/instance"

export type LoginParamsType = {
  username: string
  password: string
}
export const authApi = {
  login(data:LoginParamsType){
	return instance.post<any>("auth/login",data)
  }
}