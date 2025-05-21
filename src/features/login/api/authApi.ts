import {instance} from "@/common/instance/instance"

export const authApi = {
  login(data:any){
	return instance.post<any>("auth/login",data)
  }
}