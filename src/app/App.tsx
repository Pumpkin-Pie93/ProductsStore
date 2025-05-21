import {BrowserRouter} from "react-router-dom"
import {AppRoutes} from "./routes"
import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "./app-selectors"

export const App = () => {
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  console.log('isLoggedIn',isLoggedIn)
  return (
    <BrowserRouter>
      <header className={''}>
        <div>
          <h6>Home</h6>
        </div>
      </header>
      <AppRoutes isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  )
}
