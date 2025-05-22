import s from './header.module.scss'
import {NavLink} from "react-router-dom"
import {useState} from "react"
import Modal from '../modal/Modal'
import AddProductForm from '../productForm/productForm'
import {PlusCircledIcon} from "@radix-ui/react-icons"
import {Button} from "../button/Button"

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
	<div>
	  <header className={s.header}>
		<Button onClick={openModal}><PlusCircledIcon />add Product</Button>
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
		<input type={'search'}/>
	  </header>
	  {isModalOpen && (
	  <Modal onClose={closeModal}>
		<AddProductForm onSuccess={closeModal} />
	  </Modal>
	)}
	</div>
)
}

export default Header