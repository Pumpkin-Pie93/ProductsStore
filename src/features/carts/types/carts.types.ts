import type {Product} from "../../products/types/productsApi.types.ts"

export type Cart = {
  id: number
  userId: number
  products: Product[]
}