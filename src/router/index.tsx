import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/RootLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Index from "../pages/Index"
import Cart from "../pages/Cart"
import Product from "../pages/Product"
import AddProduct from "../pages/AddProduct"
import Profile from "../pages/Profile"
import ProtectedRoute from "../components/ProtectedRoute";
import { getUserData } from "../data";

const userData = getUserData()

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout />}>
            <Route index element={
                <ProtectedRoute isAllowed={userData?.accessToken} path="/login">
                    <Index />
                </ProtectedRoute>
            } />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={
                <ProtectedRoute isAllowed={userData?.accessToken} path="/login">
                    <Cart />
                </ProtectedRoute>
            } />
            <Route path="/add-product" element={
                <ProtectedRoute isAllowed={userData?.accessToken} path="/login">
                    <AddProduct />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute isAllowed={userData?.accessToken} path="/login">
                    <Profile />
                </ProtectedRoute>
            } />
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
    </>
));