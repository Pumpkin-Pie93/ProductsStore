import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchAll', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
	builder
	  .addCase(fetchProducts.pending, state => {
		state.loading = true;
		state.error = null;
	  })
	  .addCase(fetchProducts.fulfilled, (state, action) => {
		state.items = action.payload;
		state.loading = false;
	  })
	  .addCase(fetchProducts.rejected, (state, action) => {
		state.loading = false;
		state.error = action.error.message || 'Произошла ошибка';
	  });
  },
});

export const productsReducer = productsSlice.reducer;
