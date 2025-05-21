import HomePage from '@/pages/homePage/HomePage'
import { LoginPage } from '@/pages/loginPage/LoginPage'
import { NotFoundPage } from '@/pages/notFoundPage/NotFoundPage'
import { ProductPage } from '@/pages/productPage/ProductPage'
import { ProductsPage } from '@/pages/productsPage/ProductsPage'
import { Route, Routes, Navigate } from 'react-router-dom'


export const AppRoutes = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
	<Routes>
	  <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" /> } />
	  <Route path="/login" element={<LoginPage />} />
	  <Route
		path="/products"
		element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />}
	  />
	  <Route
		path="/products/:id"
		element={isLoggedIn ? <ProductPage /> : <Navigate to="/login" />}
	  />
	  <Route path="*" element={<NotFoundPage />} />
	</Routes>
  )
}