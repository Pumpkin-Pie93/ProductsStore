import type {RootState} from "../../../store/store.ts"

export const selectCarts = (state:RootState) => state.carts.items
