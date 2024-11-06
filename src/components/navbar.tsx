import { skipToken } from '@reduxjs/toolkit/query/react';
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaBars, FaRegHeart, FaSearch, FaTimes } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../app/features/CartSlice";
import { getUserData } from "../data";
import NavbarDropDown from "./NavbarDropDown";
import { useGetSearchProductQuery } from '../app/features/ProductsSlice';

const MyNavbar = () => {
    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const userData = getUserData()
    const menuRef = useRef<HTMLUListElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const { data } = useGetCartQuery(userData ? { userId: userData.user.id } : skipToken)
    const { data: searchData } = useGetSearchProductQuery(searchQuery ? { searchQuery } : skipToken);
    const handleMenuToggle = () => {
        setIsMenuOpen(prev => !prev)
    }

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);

            // Optionally close the menu on resize if the width exceeds a breakpoint
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchQuery) {
            toast.error('Please enter a search query', {
                position: "top-right",
                duration: 2000
            })
            return;
        }
        navigate(`/products/search?q=${searchQuery}`, { state: searchData })
    }
    return (
        <nav className="bg-white sticky top-0 z-10 p-4 lg:p-2 border border-solid border-gray-300">
            <div className="container flex lg:items-center flex-wrap">
                <Link className="font-bold text-[20px] block" to="/" >E-Commerce</Link>
                <button className="lg:hidden flex flex-col gap-1 ml-auto items-center justify-center"
                    onClick={handleMenuToggle}>
                    {isMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
                </button>
                <div
                    className={`link-collapse flex-grow flex flex-col lg:flex-row justify-between lg:justify-start w-full lg:w-fit`}
                    style={{
                        height: windowWidth < 1024 ? isMenuOpen ? `${280}px` : '0px' : 'auto',
                        overflow: windowWidth < 1024 ? isMenuOpen ? `visible` : 'hidden' : 'visible',
                    }}>
                    <ul className="flex flex-col lg:flex-row lg:items-center leading-none lg:mx-auto lg:gap-5 mt-4 lg:mt-0" ref={menuRef}>
                        <li className="p-2">
                            <NavLink className="text-sm" to="/">Home</NavLink>
                        </li>
                        <li className="p-2">
                            <NavLink className="text-sm" to="/contact">Contact</NavLink>
                        </li>
                        <li className="p-2">
                            <NavLink className="text-sm" to="/about">About</NavLink>
                        </li>
                        {userData && userData.user.username.toLowerCase().includes("islam") && (
                            <li className="p-2">
                                <NavLink className="text-sm" to="/dashboard">Dashboard</NavLink>
                            </li>
                        )}
                        {!userData && (
                            <>
                                <li className="p-2">
                                    <NavLink className="text-sm" to="/register">Register</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink className="text-sm" to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="flex gap-4 items-center flex-wrap lg:flex-nowrap p-1">
                        <form className="w-full lg:w-64" onSubmit={handleSearch}>
                            <div className="relative">
                                <input className="bg-gray-100 border-none p-2 pl-4 pr-9 w-full text-sm rounded-md focus:outline-none focus:ring-0"
                                    type="text" placeholder="What are you looking for?"
                                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                <button className="absolute top-[11px] right-3 text-gray-700">
                                    <FaSearch size={14} />
                                </button>
                            </div>
                        </form>
                        {userData && (
                            <>
                                <Link to={"#"}>
                                    <FaRegHeart />
                                </Link>
                                <Link to={"/cart"} className="relative">
                                    <RiShoppingCart2Line size={18} />
                                    <span className="w-4 h-4 flex items-center justify-center rounded-full text-[10px] text-white bg-red-700 absolute -top-2 -right-2">
                                        {data?.cart.length || 0}
                                    </span>
                                </Link>
                                <NavbarDropDown user={userData} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MyNavbar




// menuRef.current?.scrollHeight