import s from './header.module.scss'
import {NavLink} from "react-router-dom"
import {useState} from "react"
import Modal from '../modal/Modal'
import AddProductForm from '../productForm/productForm'
import {PlusCircledIcon} from "@radix-ui/react-icons"
import {Button} from "../button/Button"
import {SearchInput} from "../searchInput/SearchInput"
import {useActions} from "../../../hooks/useActions"
import {clearCurrentProduct, getAllProducts } from '@/features/products/productSlice/productsSlice'
import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "../../../app/app-selectors"

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { getProductById } = useActions()
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const onSearchHandler = (value:number | null) => {
	if (!value) {
	  clearCurrentProduct()
	  getAllProducts()  // очистка — показываем все товары
	} else {
	  getProductById({ id: value })
	}
  }

  return (
	<div>
	  <header className={s.header}>
		<Button onClick={openModal} disabled={!isLoggedIn}><PlusCircledIcon />add Product</Button>
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
		<SearchInput onSearch={onSearchHandler} disabled={!isLoggedIn}/>
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