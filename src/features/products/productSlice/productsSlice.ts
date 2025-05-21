import { createSlice } from '@reduxjs/toolkit';
import type {Product} from "@/features/products/types/productsApi.types"
import {productsApi} from "@/features/products/api/productsApi"
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk';

interface ProductsState {
  items: Product[];
  currentProduct: Product | null
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: false,
  error: null,
}

const slice = createSlice({
  name:'products',
  initialState,
  reducers:{},
  extraReducers: builder => {
	builder
	  .addCase(getAllProducts.pending, state => {
		state.loading = true;
		state.error = null;
	  })
	  .addCase(getAllProducts.fulfilled, (state,action)=>{
         state.items = action.payload
		state.loading = false
	  })
	  .addCase(getAllProducts.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload as string;
	  })
	  .addCase(getProductById.fulfilled,(state, action) => {
	    state.loading = false
		state.currentProduct = action.payload

	})
	  // ADD
	  .addCase(addNewProduct.fulfilled, (state, action) => {
		state.items.unshift(action.payload)
		state.loading = false
	  })
	  .addCase(addNewProduct.pending, (state) => {
		state.loading = true
		state.error = null
	  })
	  .addCase(addNewProduct.rejected, (state, action) => {
		state.loading = false
		state.error = action.payload as string
	  })

	  // UPDATE
	  .addCase(updateProduct.fulfilled, (state, action) => {
		const index = state.items.findIndex(item => item.id === action.payload.id)
		if (index !== -1) {
		  state.items[index] = action.payload
		}
		state.loading = false
	  })
	  .addCase(updateProduct.pending, (state) => {
		state.loading = true
		state.error = null
	  })
	  .addCase(updateProduct.rejected, (state, action) => {
		state.loading = false
		state.error = action.payload as string
	  })

	  // DELETE
	  .addCase(deleteProduct.fulfilled, (state, action) => {
		state.items = state.items.filter(item => item.id !== action.payload)
		state.loading = false
	  })
	  .addCase(deleteProduct.pending, (state) => {
		state.loading = true
		state.error = null
	  })
	  .addCase(deleteProduct.rejected, (state, action) => {
		state.loading = false
		state.error = action.payload as string
	  })

  }
})


//thunks

export const getAllProducts = createAppAsyncThunk<Product[]>(
  'products/getAllProducts',
  async (_, { rejectWithValue }) => {
	try {
	  const res = await productsApi.getAllProducts();
	  return res.data
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при загрузке товаров');
	}
  }
)

export const getProductById = createAppAsyncThunk<Product, { id: number }>(
  'products/getProductById',
  async (arg, { rejectWithValue }) => {
	try {
	  const res = await productsApi.getProductById(arg.id)
	  return res.data
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при загрузке товара');
	}
  }
)
export const addNewProduct = createAppAsyncThunk<Product, Product>(
  'products/addNewProduct',
  async (productData, { rejectWithValue }) => {
	try {
	  const res = await productsApi.addNewProduct(productData)
	  return res.data
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при добавлении товара')
	}
  }
)

export const updateProduct = createAppAsyncThunk<Product, Product>(
  'products/updateProduct',
  async (productData, { rejectWithValue }) => {
	try {
	  const res = await productsApi.updateProduct(productData)
	  return res.data
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при обновлении товара')
	}
  }
)

export const deleteProduct = createAppAsyncThunk<number, number>(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
	try {
	  await productsApi.deleteProduct(id)
	  return id
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при удалении товара')
	}
  }
)

export const productsReducer = slice.reducer
export const productsActions = slice.actions
export const productsThunks = {
  getAllProducts,
  getProductById,
  deleteProduct,
  addNewProduct,
  updateProduct
}

