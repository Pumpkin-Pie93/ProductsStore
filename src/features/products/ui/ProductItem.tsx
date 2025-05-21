import type {Product} from "../types/productsApi.types.ts"
import s from './ProductItem.module.scss'
import clsx from "clsx"
import {useNavigate} from "react-router-dom"

const ProductItem = (product:Product) => {
  const {id, image, price, title, category, description} = product
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '_')
  const categoryClass = clsx(s.category, s[`category_${normalizedCategory}`])
  const navigate = useNavigate()

  const handleOpen = () => {
	navigate(`/products/${id}`)
  }
  return (
	<div className={s.product} onClick={handleOpen}>
	  <div className={s.productImageWrapper}>
		<img alt="product image" src={image}/>
	  </div>

	  <div className={s.productInfo}>
		<h4 className={s.title}>{title}</h4>
	  </div>

	  <div className={s.productFooter}>
		<h2 className={s.price}>${price}</h2>
		<div className={categoryClass}>{category}</div>
	  </div>

	  <div className={s.fullDescription}>{description}</div>
	</div>
  )
}

export default ProductItem