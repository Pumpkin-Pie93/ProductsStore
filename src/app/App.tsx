import {BrowserRouter} from "react-router-dom"
import {AppRoutes} from "./routes"
import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "./app-selectors"
import Header from "../shared/components/header/Header"

export const App = () => {
  const isLoggedIn = useSelector(selectorIsLoggedIn)

  return (
    <BrowserRouter>
      <Header/>
       <AppRoutes isLoggedIn={isLoggedIn}/>
    </BrowserRouter>
  )
}
