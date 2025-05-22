export type Cart = {
  id: number
  date:string
  userId: number
  products: CartProducts[]
}

export type CartProducts = {
  productId: number
  quantity: number
}