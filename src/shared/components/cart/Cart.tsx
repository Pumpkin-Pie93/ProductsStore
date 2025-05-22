import type {Cart} from "../../../features/carts/types/carts.types.ts"
import s from './cart.module.scss'
type Props = {
  cart: Cart
}
const Cart = (props:Props) => {
  const {cart} = props
  return (
	<div key={cart.id} className={s.cartWrapper}>
	  <div className={s.cartIdInfo}>
		<span>Cart ID: {cart.id}</span>
		<span>User ID: {cart.userId}</span>
	  </div>
	  {cart.products.map( (p) => {
		return (
		  <div className={s.cartInfo}>
			<div className={s.productId}>
			  <span>ProductId: </span>{p.productId}
			</div>
			<div className={s.quantity}>
			  <span>Quantity: </span>{p.quantity}
			</div>
		  </div>
		)}
	  )}
	</div>
  )
}

export default Cart