import type {RootState} from "../store/store.ts"

export const selectorStatus = (state: RootState) => state.app.status;
export const selectorIsInitialized = (state: RootState) => state.app.isInitialized;
export const selectorIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;