import {configureStore} from "@reduxjs/toolkit"
import {productsReducer} from "@/features/products/productSlice/productsSlice"
import {authReducer} from "@/features/login/authSlice/authSlice"
import { appReducer } from "@/app/appSlice.js"
import {cartsReducer} from "@/features/carts/cartsSlice/cartsSlice"
import {usersReducer} from "@/features/users/usersSlice/usersSlice"

export const store = configureStore({
  reducer: {
	products: productsReducer,
	auth:authReducer,
	app: appReducer,
	carts: cartsReducer,
	users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch