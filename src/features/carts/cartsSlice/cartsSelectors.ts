import type {RootState} from "../../../store/store.ts"

export const selectCarts = (state:RootState) => state.carts.items
export const selectCartsLoading = (state: RootState) => state.carts.loading
export const selectCartsError = (state: RootState) => state.carts.error