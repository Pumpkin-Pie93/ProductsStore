import { createAsyncThunk } from "@reduxjs/toolkit"
import { BaseResponseType } from "@/types/BaseResponseType"
import { AppDispatch } from "@/store/store"
import type {RootState} from "../store/store.ts"

/**
 * Создает асинхронный Thunk для приложения с заранее определенными типами состояния, диспетчера и значения отклонения.
 * @function createAppAsyncThunk
 * @param withTypes - Метод для определения типов состояния, диспетчера и значения отклонения.
 * @returns Асинхронный Thunk для приложения, интегрированный с определенными заранее типами.
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: null | BaseResponseType | string
}>()
