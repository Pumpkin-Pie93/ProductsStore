import {useEffect} from "react"
import {useActions} from "../../hooks/useActions"
import {useSelector} from "react-redux"
import {selectCarts} from "../../features/carts/cartsSlice/cartsSelectors"

const CartsPage = () => {
  const carts = useSelector(selectCarts)
  const { getAllCarts } = useActions()

  useEffect(() => {
    getAllCarts()
  }, [])

  return (
    <div style={{ padding: 20 }}>
    🛒 Carts Page
      {carts.map((c) => {
        return (
          <div key={c.id} style={{'border':'2px solid'}}>
          <div>{c.id}</div>
          <div>{c.userId}</div>
          <div>{c.products[0].title}</div>
        </div>
        )
      })}
    </div>
  )
}
export default CartsPage
