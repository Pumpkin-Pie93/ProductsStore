import {BrowserRouter, NavLink} from "react-router-dom"
import {AppRoutes} from "./routes"
import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "./app-selectors"
import s from './App.module.scss'
import {useState} from "react"
import AddProductForm from "@/shared/components/productForm/productForm"
import Modal from "@/shared/components/modal/Modal"

export const App = () => {
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  return (
    <BrowserRouter>
      <header className={s.header}>
        <NavLink
          to={"/"}
          className={({isActive}) => isActive ? s.activeLink : s.link}
        >Home</NavLink>

        <NavLink
          to={"/products"}
          className={({isActive}) => isActive ? s.activeLink : s.link}
        >Products</NavLink>

        <NavLink
          to={"/carts"}
          className={({isActive}) => isActive ? s.activeLink : s.link}
        >Carts</NavLink>

        <NavLink
          to={"/users"}
          className={({isActive}) => isActive ? s.activeLink : s.link}
        >Users</NavLink>
      </header>
      <button onClick={openModal}>Create new Product</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <AddProductForm onSuccess={closeModal} />
        </Modal>
      )}
      <AppRoutes isLoggedIn={isLoggedIn}/>
    </BrowserRouter>
  )
}
