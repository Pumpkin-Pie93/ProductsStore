import {useCallback, useEffect} from "react"
import {useActions} from "../../hooks/useActions"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "../../app/app-selectors"

export const LoginPage = ()=> {
  const {login} = useActions()
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const navigate = useNavigate()
  useEffect(() => {
	if (isLoggedIn) {
	  navigate('/')
	}
  }, [isLoggedIn, navigate])
  const loginHandler = useCallback(() => {
	login({data: {username: 'mor_2314', password: '83r5^_'}})
  }, [])
  return (
	<div>
	  LoginPage
	  <button onClick={loginHandler}>Login</button>
	</div>
  )
}