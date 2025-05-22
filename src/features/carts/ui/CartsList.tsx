import {useSelector} from "react-redux"
import {selectCarts} from "../cartsSlice/cartsSelectors"
import {useActions} from "@/hooks/useActions"
import {useEffect} from "react"
import Cart from "@/shared/components/cart/Cart"

import s from './cartList.module.scss'

const CartsList = () => {
  const carts = useSelector(selectCarts)
  const { getAllCarts } = useActions()

  useEffect(() => {
	getAllCarts()
  }, [])

  return (
	<div className={s.cartsListWrapper}>
	  {carts.map((cart) => {
		return <Cart cart={cart} key={cart.id}/>
	  })}
	</div>
  )
}

export default CartsList