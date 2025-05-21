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

export const productsReducer = slice.reducer
export const productsActions = slice.actions
export const productsThunks = {getAllProducts, getProductById}

