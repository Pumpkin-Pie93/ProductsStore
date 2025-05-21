import {useEffect} from "react"
import {useSelector} from "react-redux"
import {selectorIsLoggedIn} from "../../app/app-selectors"
import {selectProducts} from "../../features/products/productSlice/products.selectors"
import {useActions} from "../../hooks/useActions"
import Product from "@/features/products/ui/Product"
import s from './ProductsPage.module.scss'
export const ProductsPage = () => {
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
		return <Product {...p} key={p.id}/>
	  })}
	</div>
  )
}