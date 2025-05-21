import { createSlice } from '@reduxjs/toolkit';
import type {Product} from "@/features/products/types/productsApi.types"
import {productsApi} from "@/features/products/api/productsApi"
import { createAppAsyncThunk } from '@/utils/create-app-async-thunk';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
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

export const productsReducer = slice.reducer
export const productsActions = slice.actions
export const productsThunks = {getAllProducts}

