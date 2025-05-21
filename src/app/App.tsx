import {BrowserRouter} from "react-router-dom"
import {AppRoutes} from "./routes"
import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "./app-selectors"
import s from './App.module.scss'

export const App = () => {
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  console.log('isLoggedIn',isLoggedIn)
  return (
    <BrowserRouter>
      <header className={s.header}>
          <h3>Home</h3>
          <h3>Products</h3>
          <h3>Carts</h3>
          <h3>Users</h3>
      </header>
      <AppRoutes isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  )
}
