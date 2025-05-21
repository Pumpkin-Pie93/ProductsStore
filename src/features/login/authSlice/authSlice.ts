import {createSlice} from "@reduxjs/toolkit"
import {createAppAsyncThunk} from "@/utils/create-app-async-thunk"
import {authApi, LoginParamsType} from "../api/authApi"

const slice = createSlice({
  name: "auth",
  initialState: {
	isLoggedIn: false
  },
  reducers: {},
  extraReducers: builder => {
	builder
	  .addCase(login.fulfilled, (state,action)=>{
		state.isLoggedIn = action.payload.isLoggedIn
	  })
  }
})

// thunks

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, { data: LoginParamsType }>(
  `auth/login`,
  async (_, { rejectWithValue }) => {
	try {
	  await authApi.login({username:'john_doe', password:'pass123'})
	  return {isLoggedIn:true}
	}
	catch (error:any){
	  return rejectWithValue(error.message || 'Ошибка логинизации');
	}
  }
)

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login}