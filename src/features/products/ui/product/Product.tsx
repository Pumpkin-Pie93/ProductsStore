import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {selectProduct} from "../../productSlice/products.selectors"
import {useActions} from "../../../../hooks/useActions"
import clsx from "clsx"
import s from "./Product.module.scss"
import {useEffect} from "react"
import { clearCurrentProduct } from "../../productSlice/productsSlice"

export const Product = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const numberId = Number(id)
  const currentProduct = useSelector(selectProduct)
  const {getProductById} = useActions()
  const normalizedCategory = currentProduct?.category.toLowerCase().replace(/[^a-z0-9]/g, '_')
  const categoryClass = clsx(s.itemCategory, s[`category_${normalizedCategory}`])
  useEffect(() => {
	if(id) {
	  getProductById({id: numberId})
	}
	return () => {
	  dispatch(clearCurrentProduct())
	}
  }, []);

  if(!currentProduct) {
	return <div>No product</div>
  }
  return (
	<div className={s.productWrap}>
	  <div className={s.imageWrapper}>
		<img alt="product image" src={currentProduct.image}/>
	  </div>
	  <div className={s.info}>
		<h4 className={s.title}>{currentProduct.title}</h4>
		<p className={s.fullDescription}>{currentProduct.description}</p>
		<div className={s.footer}>
		  <h3 className={s.price}>${currentProduct.price}</h3>
		  <div className={categoryClass}>{currentProduct.category}</div>
		</div>
	  </div>
	</div>
  )
}