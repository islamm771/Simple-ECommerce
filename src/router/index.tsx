import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/RootLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Index from "../pages/Index"
import Cart from "../pages/Cart"
import Product from "../pages/Product"
import Profile from "../pages/Profile"
import ProtectedRoute from "../components/ProtectedRoute";
import { getUserData } from "../data";
import PageNotFound from "../pages/PageNotFound";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Products from "../pages/Dashboard/Products";
import Users from "../pages/Dashboard/Users";
import Dashboard from "../pages/Dashboard/Index";
import Categories from "../pages/Dashboard/Categories";
import Search from "../pages/Search";
import Favourite from "../pages/Favourite";

const userData = getUserData()

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Index />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/products/search" element={<Search />} />
            <Route path="/cart" element={
                <ProtectedRoute isAllowed={userData?.token} path="/login">
                    <Cart />
                </ProtectedRoute>
            } />
            <Route path="/favourite" element={
                <ProtectedRoute isAllowed={userData?.token} path="/login">
                    <Favourite />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute isAllowed={userData?.token} path="/login">
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/login" element={
                <ProtectedRoute isAllowed={!userData?.token} path="/">
                    <Login />
                </ProtectedRoute>
            } />
            <Route path="/register" element={
                <ProtectedRoute isAllowed={!userData?.token} path="/">
                    <Register />
                </ProtectedRoute>
            } />
            <Route path="*" element={<PageNotFound />} />

        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={
                <ProtectedRoute isAllowed={userData?.token} path="/login">
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="users" element={
                <ProtectedRoute isAllowed={userData?.token} path="/login">
                    <Users />
                </ProtectedRoute>
            } />
            <Route path="products" element={
                <ProtectedRoute isAllowed={userData?.token} path="/login">
                    <Products />
                </ProtectedRoute>
            } />
            <Route path="categories" element={
                <ProtectedRoute isAllowed={userData?.token} path="/login">
                    <Categories />
                </ProtectedRoute>
            } />
        </Route>
    </>
));