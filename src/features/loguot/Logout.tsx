import {Button} from "../../shared/components/button/Button"
import {useNavigate} from "react-router-dom"
import s from './logout.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch"
import { authActions } from "../login/authSlice/authSlice"

const Logout = () => {
  const navigate = useNavigate()
const dispatch = useAppDispatch()
  const onLogoutHandler = () => {
	dispatch(authActions.logout())
	navigate('/login')
  }

  return (
	<div className={s.logoutWrapper}>
	  <Button onClick={onLogoutHandler} variant={'secondary'}>
		Logout
	  </Button>
	</div>
  )
}

export default Logout;