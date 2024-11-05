import { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { useGetCartQuery } from "../app/features/CartSlice";
import { getUserData } from "../data";
import NavbarDropDown from "./NavbarDropDown";
const MyNavbar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const userData = getUserData()
    const menuRef = useRef<HTMLUListElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { data } = useGetCartQuery({ userId: userData?.user.id })

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

    return (
        <nav className="bg-white sticky top-0 z-10 p-4 lg:p-2 border border-solid border-gray-300">
            <div className="container flex lg:items-center flex-wrap">
                <Link className="font-bold text-[20px] block" to="/" >E-Commerce</Link>
                <button className="lg:hidden flex flex-col gap-1 ml-auto items-center justify-center"
                    onClick={handleMenuToggle}>
                    <span className={`bg-black rounded-sm w-8 h-1 block ${isMenuOpen ? "rotate-45" : "rotate-0"}`}></span>
                    <span className={`bg-black rounded-sm w-8 h-1 ${isMenuOpen ? "hidden" : "block"}`}></span>
                    <span className={`bg-black rounded-sm w-8 h-1 block ${isMenuOpen ? "-rotate-45 -mt-[7px]" : "rotate-0"}`}></span>
                </button>
                <div
                    className={`link-collapse flex-grow flex flex-col lg:flex-row justify-between lg:justify-start w-full lg:w-fit`}
                    style={{
                        height: windowWidth < 1024 ? isMenuOpen ? `${280}px` : '0px' : 'auto',
                        overflow: windowWidth < 1024 ? isMenuOpen ? `visible` : 'hidden' : 'visible',
                    }}>
                    <ul className="flex flex-col lg:flex-row lg:items-center leading-none lg:mx-auto lg:gap-5" ref={menuRef}>
                        <li className="p-2">
                            <NavLink className="text-sm" to="/">Home</NavLink>
                        </li>
                        <li className="p-2">
                            <NavLink className="text-sm" to="/contact">Contact</NavLink>
                        </li>
                        <li className="p-2">
                            <NavLink className="text-sm" to="/about">About</NavLink>
                        </li>
                        <li className="p-2">
                            <NavLink className="text-sm" to="/dashboard">Dashboard</NavLink>
                        </li>
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
                        <form className="w-full lg:w-64">
                            <div className="relative">
                                <input className="bg-gray-100 border-none p-2 pl-4 pr-9 w-full text-sm rounded-md focus:outline-none focus:ring-0"
                                    type="text"
                                    placeholder="What are you looking for?" />
                                <FaSearch size={14} className="absolute top-[11px] right-3 text-gray-700" />
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