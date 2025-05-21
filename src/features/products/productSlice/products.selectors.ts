import type {RootState} from "../../../store/store.ts"

export const selectProducts = (state:RootState) => state.products
export const selectProduct = (state:RootState) => state.products.currentProduct