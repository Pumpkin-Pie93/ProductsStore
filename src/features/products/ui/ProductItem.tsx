import s from './ProductItem.module.scss'
import sDrop from '@/shared/components/dropdown/dropdown.module.scss'
import clsx from "clsx"
import {useNavigate} from "react-router-dom"
import {useActions} from "@/hooks/useActions"
import {useState} from "react"
import Modal from "@/shared/components/modal/Modal.js"
import {Dropdown} from "@/shared/components/dropdown/Dropdown"
import {DropdownContent, DropdownTrigger} from "@/shared/components/dropdown/Dropdown"
import {DropdownMenuItem} from "@radix-ui/react-dropdown-menu"
import {CrossCircledIcon, DotsHorizontalIcon, Pencil2Icon} from "@radix-ui/react-icons"
import UpdateProductForm from "@/shared/components/updateProductForm/UpdateProductForm"
import { Product } from '../types/productsApi.types'

const ProductItem = (product:Product) => {
  const {id, image, price, title, category, description} = product
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '_')
  const categoryClass = clsx(s.category, s[`category_${normalizedCategory}`])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false)
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
	  <div className={s.dropdownWrapper}>
		<Dropdown>
          <DropdownTrigger>
            <DotsHorizontalIcon color={'#ccc'}/>
           </DropdownTrigger>
		  <DropdownContent >
			<DropdownMenuItem onClick={openModal} className={sDrop.dropdownItem}><CrossCircledIcon/>Delete </DropdownMenuItem>
			<DropdownMenuItem onClick={()=> setIsEditProductModalOpen(true)} className={sDrop.dropdownItem}><Pencil2Icon/>Edit </DropdownMenuItem>
		  </DropdownContent>
		</Dropdown>
	  </div>
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
	  {isEditProductModalOpen && (
		<Modal onClose={()=> setIsEditProductModalOpen(false)}>
		  <UpdateProductForm prevProductInfo={product} onSuccess={()=> setIsEditProductModalOpen(false)}/>
		</Modal>
	  )}
	</div>
  )
}

export default ProductItem