import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "../../../app/app-selectors"
import {selectProducts} from "../productSlice/products.selectors"
import {useActions} from "../../../hooks/useActions"
import {useEffect} from "react"
import s from "./ProductItem.module.scss"
import { Product } from "../types/productsApi.types"
import ProductItem from "./ProductItem"

export const ProductsList = () => {
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const products = useSelector(selectProducts)
  const {getAllProducts} = useActions()
  useEffect(() => {
	if(isLoggedIn){
	  getAllProducts()
	}
  }, []);
  return (
	<div className={s.productsWrapper}>
	  {products.items.map((p: Product)=>{
		return <ProductItem {...p} key={p.id}/>
	  })}
	</div>
  )
}