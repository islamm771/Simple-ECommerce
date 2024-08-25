import { Route, Routes } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import Register from "./pages/Register"
import Index from "./pages/Index"
import Cart from "./pages/Cart"
import ProtectedRoute from "./components/ProtectedRoute"
import Product from "./pages/Product"

const App = () => {
  const userDataString = localStorage.getItem("userData")
  const userData = userDataString ? JSON.parse(userDataString) : null
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={
            <ProtectedRoute isAllowed={userData?.accessToken} path="/login">
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={
            <ProtectedRoute isAllowed={!userData?.accessToken} path="/">
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute isAllowed={!userData?.accessToken} path="/">
              <Register />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App