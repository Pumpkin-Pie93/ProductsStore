import { useActions } from "../../../hooks/useActions"
import { useSelector } from "react-redux"
import { selectorIsLoggedIn } from "../../../app/app-selectors"
import { useNavigate } from "react-router-dom"
import {FormEvent, useEffect, useState } from "react"

import s from './login.module.scss'
import { Button } from "../../../shared/components/button/Button"

const Login = () => {
  const { login } = useActions()
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  useEffect(() => {
	if (isLoggedIn) {
	  navigate("/products")
	}
  }, [isLoggedIn, navigate])

  const validate = () => {
	const newErrors: typeof errors = {}

	const usernameRegex = /^[A-Za-z0-9!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/ // разрешены латиница и спецсимволы

	if (!username || !usernameRegex.test(username)) {
	  newErrors.username = "Only Latin letters and symbols allowed"
	}

	if (!password || password.length < 3) {
	  newErrors.password = "Password must be at least 3 characters"
	}

	setErrors(newErrors)
	return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
	e.preventDefault()
	if (!validate()) return

	login({ data: { username, password } })
  }

  return (
	<div className={s.loginWrapper}>
	  <h2>Login</h2>
	  <form onSubmit={handleSubmit} className={s.loginForm}>
		<input
		  type="text"
		  placeholder="Username"
		  value={username}
		  onChange={e => setUsername(e.target.value)}
		  className={s.input}
		/>
		{errors.username && <div className={s.error}>{errors.username}</div>}

		<input
		  type="password"
		  placeholder="Password"
		  value={password}
		  onChange={e => setPassword(e.target.value)}
		  className={s.input}
		/>
		{errors.password && <div className={s.error}>{errors.password}</div>}

		<Button variant={'secondary'} type="submit">Login</Button>
	  </form>
	</div>
  )
}

export default Login
