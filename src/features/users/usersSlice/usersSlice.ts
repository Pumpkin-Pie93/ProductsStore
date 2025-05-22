import { createAppAsyncThunk } from "@/utils/create-app-async-thunk"
import { User } from "../types/users.types"
import { usersApi } from "../api/usersApi"
import { createSlice } from "@reduxjs/toolkit"

interface UsersState {
  items: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
}

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
	builder
	  // getAllUsers
	  .addCase(getAllUsers.pending, (state) => {
		state.loading = true
		state.error = null
	  })
	  .addCase(getAllUsers.fulfilled, (state, action) => {
		state.items = action.payload
		state.loading = false
	  })
	  .addCase(getAllUsers.rejected, (state, action) => {
		state.loading = false
		state.error = action.payload as string
	  })

	  // addNewUser
	  .addCase(addNewUser.fulfilled, (state, action) => {
		state.items.push(action.payload)
	  })

	  // updateUser
	  .addCase(updateUser.fulfilled, (state, action) => {
		const index = state.items.findIndex(u => u.id === action.payload.id)
		if (index !== -1) {
		  state.items[index] = action.payload
		}
	  })

	  // deleteUser
	  .addCase(deleteUser.fulfilled, (state, action) => {
		state.items = state.items.filter(user => user.id !== action.payload)
	  })
  }
})

// Thunks
export const getAllUsers = createAppAsyncThunk<User[]>(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
	try {
	  const res = await usersApi.getAllUsers()
	  return res.data
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при загрузке пользователей')
	}
  }
)

export const addNewUser = createAppAsyncThunk<User, User>(
  'users/addNewUser',
  async (userData, { rejectWithValue }) => {
	try {
	  const res = await usersApi.addNewUser(userData)
	  return res.data
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при добавлении пользователя')
	}
  }
)

export const updateUser = createAppAsyncThunk<User, { id: number, data: User }>(
  'users/updateUser',
  async ({ id, data }, { rejectWithValue }) => {
	try {
	  const res = await usersApi.updateUser({ id, data })
	  return res.data
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при обновлении пользователя')
	}
  }
)

export const deleteUser = createAppAsyncThunk<number, number>(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
	try {
	  await usersApi.deleteUser(id)
	  return id
	} catch (error: any) {
	  return rejectWithValue(error.message || 'Ошибка при удалении пользователя')
	}
  }
)

export const usersReducer = slice.reducer
export const usersActions = slice.actions
export const usersThunks = {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
}