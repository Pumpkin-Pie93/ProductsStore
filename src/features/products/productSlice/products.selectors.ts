import type {RootState} from "../../../store/store.ts"

export const selectProducts = (state:RootState) => state.products
export const selectProduct = (state:RootState) => state.products.currentProduct
export const selectProductError = (state:RootState) => state.products.error
export const selectProductLoading = (state:RootState) => state.products.loading