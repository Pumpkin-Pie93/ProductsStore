import HomePage from '@/pages/homePage/HomePage'
import { LoginPage } from '@/pages/loginPage/LoginPage'
import { NotFoundPage } from '@/pages/notFoundPage/NotFoundPage'
import ProductPage from '@/pages/productPage/ProductPage'
import ProductsListPage from '@/pages/productsPage/ProductsListPage'
import { Route, Routes, Navigate } from 'react-router-dom'
import CartsPage from "../pages/cartsPage/CartsPage"
import UsersPage from "../pages/usersPage/UsersPage"


export const AppRoutes = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
	<Routes>
	  <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" /> } />
	  <Route path="/login" element={<LoginPage />} />
	  <Route
		path="/products"
		element={isLoggedIn ? <ProductsListPage /> : <Navigate to="/login" />}
	  />
	  <Route
		path="/products/:id"
		element={isLoggedIn ? <ProductPage /> : <Navigate to="/login" />}
	  />
	  <Route
		path="/carts"
		element={isLoggedIn ? <CartsPage /> : <Navigate to="/login" />}
	  />
	  <Route
		path="/users"
		element={isLoggedIn ? <UsersPage /> : <Navigate to="/login" />}
	  />
	  <Route path="*" element={<NotFoundPage />} />
	</Routes>
  )
}