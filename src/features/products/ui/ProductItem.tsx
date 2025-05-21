import type {Product} from "../types/productsApi.types.ts"
import s from './ProductItem.module.scss'
import clsx from "clsx"
import {useNavigate} from "react-router-dom"
import {useActions} from "../../../hooks/useActions"
import {useState} from "react"
import Modal from "@/shared/components/modal/Modal.js"

const ProductItem = (product:Product) => {
  const {id, image, price, title, category, description} = product
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '_')
  const categoryClass = clsx(s.category, s[`category_${normalizedCategory}`])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const {deleteProduct} = useActions()
  const handleOpen = () => {
	navigate(`/products/${id}`)
  }
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleDelete = (id:number) => {
	deleteProduct(id)
  }

  return (
	<div className={s.product}>
	  <button className={s.deleteBtn} onClick={openModal}>
		✕
	  </button>
	  <div className={s.productImageWrapper}>
		<img alt="product image" src={image}/>
	  </div>
	  <div className={s.productInfo} onClick={handleOpen}>
		<h4 className={s.title}>{title}</h4>
	  </div>
	  <div className={s.productFooter}>
		<h2 className={s.price}>${price}</h2>
		<div className={categoryClass}>{category}</div>
	  </div>
	  <div className={s.fullDescription}>
		<p>{description}</p>
	  </div>
	  {isModalOpen && (
		<Modal onClose={closeModal}>
		  <div><p>{`Do you wont to delete product ${title}`}</p></div>
		  <button onClick={(e) => {
			e.stopPropagation()
			handleDelete(id)
		  }}>Yes
		  </button>
		  <button onClick={closeModal}>No</button>
		</Modal>
	  )}
	</div>
  )
}

export default ProductItem