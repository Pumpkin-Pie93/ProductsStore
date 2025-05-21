import {createSlice} from "@reduxjs/toolkit"
import {createAppAsyncThunk} from "@/utils/create-app-async-thunk"
import {authApi, LoginParamsType} from "../api/authApi"

const token = localStorage.getItem('token')

const initialState = {
  isLoggedIn: !!token,
}

const slice = createSlice({
  name: "auth",
  initialState,
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
  async (arg, { rejectWithValue }) => {
	try {
	  const res = await authApi.login(arg.data)
	  const token = res.data.token
	  if(token){
		localStorage.setItem('token', token)
		return {isLoggedIn:true}
	  } else {
		return rejectWithValue('Token not received')
	  }
	}
	catch (error:any){
	  return rejectWithValue(error.message || 'Ошибка логинизации');
	}
  }
)

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login}