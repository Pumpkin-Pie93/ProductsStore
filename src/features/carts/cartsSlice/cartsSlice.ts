import {createSlice} from "@reduxjs/toolkit"
import type {Cart} from "../types/carts.types.ts"
import {createAppAsyncThunk} from "@/utils/create-app-async-thunk"
import {cartsApi} from "../api/cartsApi"


interface CartsState {
  items: Cart[]
  currentCart: Cart | null
  loading: boolean
  error: string | null
}

const initialState: CartsState = {
  items: [],
  currentCart: null,
  loading: false,
  error: null,
}

const slice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All
      .addCase(getAllCarts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Get by ID
      .addCase(getCartById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCartById.fulfilled, (state, action) => {
        state.currentCart = action.payload
        state.loading = false
      })
      .addCase(getCartById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Add
      .addCase(addNewCart.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })

      // Update
      .addCase(updateCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(cart => cart.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })

      // Delete
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.items = state.items.filter(cart => cart.id !== action.payload)
      })
  }
})


//thunks


export const getAllCarts = createAppAsyncThunk<Cart[]>(
  "carts/getAllCarts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartsApi.getAllCarts()
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка при загрузке корзин")
    }
  }
)

export const getCartById = createAppAsyncThunk<Cart, number>(
  "carts/getCartById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await cartsApi.getCartById(id)
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка при получении корзины")
    }
  }
)

export const addNewCart = createAppAsyncThunk<Cart, Cart>(
  "carts/addNewCart",
  async (data, { rejectWithValue }) => {
    try {
      const res = await cartsApi.addNewCart(data)
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка при добавлении корзины")
    }
  }
)

export const updateCart = createAppAsyncThunk<Cart, { id: number; data: Cart }>(
  "carts/updateCart",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await cartsApi.updateCart({ id, data })
      return res.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка при обновлении корзины")
    }
  }
)

export const deleteCart = createAppAsyncThunk<number, number>(
  "carts/deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      await cartsApi.deleteCart(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка при удалении корзины")
    }
  }
)


export const cartsReducer = slice.reducer
export const cartsActions = slice.actions
export const cartsThunks = {
  getAllCarts,
  getCartById,
  addNewCart,
  updateCart,
  deleteCart
}