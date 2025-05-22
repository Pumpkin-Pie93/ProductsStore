import {useSelector} from "react-redux"
import {useEffect} from "react"
import UserItem from "@/shared/components/user/UserItem"
import { selectUsers } from "../usersSlice/usersSelectors"
import { useActions } from "@/hooks/useActions"

import s from './userList.module.scss'

const UsersList = () => {
  const {getAllUsers} = useActions()
  const users = useSelector(selectUsers)
  useEffect(() => {
	getAllUsers()
  }, [])
  return (
	<table className={s.userTable}>
	  <thead>
	  <tr>
		<th>ID</th>
		<th>User Name</th>
		<th>Email</th>
		<th>Password</th>
	  </tr>
	  </thead>
	  <tbody>
	  {users.map((user) => (
		<UserItem user={user}/>
	  ))}
	  </tbody>
	</table>
  )
}

export default UsersList;