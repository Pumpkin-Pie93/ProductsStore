import { useMemo } from "react"
import {useAppDispatch} from "./useAppDispatch"
import {authThunks} from "@/features/login/authSlice/authSlice"
import {productsThunks} from "@/features/products/productSlice/productsSlice"
import { ActionCreatorsMapObject, bindActionCreators } from "redux"
import {cartsThunks} from "@/features/carts/cartsSlice/cartsSlice"
import {usersThunks} from "@/features/users/usersSlice/usersSlice"

// ❗ упаковываем actions и соответственно при вызове хука не нужно
// будет передавать actions
const actionsAll = {...productsThunks, ...authThunks, ...cartsThunks, ...usersThunks }

type AllActions = typeof actionsAll

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(
	() => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
	[dispatch],
  )
}

// Types
type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>
}
