import {createSlice} from "@reduxjs/toolkit"
import type {Cart} from "../types/carts.types.ts"
import {createAppAsyncThunk} from "@/utils/create-app-async-thunk"
import {cartsApi} from "../api/cartsApi"

interface CartsState {
  items: Cart[],
  loading: boolean,
  error: string | null
}

const initialState: CartsState = {
  items:[],
  loading: false,
  error: null,
}

const slice = createSlice({
  name:'carts',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder
      //GET
      .addCase(getAllCarts.fulfilled,( state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(getAllCarts.pending,( state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

//thunks

export const getAllCarts = createAppAsyncThunk<Cart[]>(
  'carts/getAllCarts',
  async (_, {rejectWithValue}) => {
    try {
      const res = await cartsApi.getAllCarts()
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке корзины');
    }
  }
)

export const cartsReducer = slice.reducer
export const cartsActions = slice.actions
export const cartsThunks = {
  getAllCarts,
}