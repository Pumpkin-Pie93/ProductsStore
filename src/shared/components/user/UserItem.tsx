import { User } from "@/features/users/types/users.types"

export type UserType = {
  user: User
}
const UserItem = (props:UserType) => {
  const {user} = props
  return (
	<tr key={user.id}>
	  <td>{user.id}</td>
	  <td>{user.username}</td>
	  <td>{user.email}</td>
	  <td>{user.password}</td>
	</tr>
  );
};

export default UserItem;