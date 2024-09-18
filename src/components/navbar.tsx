import { Dropdown } from "flowbite-react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { getUserData } from "../data";

const MyNavbar = () => {
    const userData = getUserData()


    const onLogout = () => {
        localStorage.removeItem("userData")
        toast.success(`Logout successful`, {
            position: "bottom-center",
            duration: 1000
        });
        setTimeout(() => {
            location.reload();
        }, 1200);
    }

    return (
        <nav className="bg-indigo-700 sticky top-0 z-10 text-white p-4">
            <div className="container flex flex-col lg:flex-row">
                <Link className="font-bold text-2xl" to="/" >E-Commerce</Link>
                <ul className="flex items-center gap-6 lg:ml-auto flex-row mt-4 lg:mt-0">
                    <li>
                        <NavLink className="text-xl" to="/">Home</NavLink>
                    </li>
                    {
                        !userData ? (
                            <>
                                <li>
                                    <NavLink className="text-xl" to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink className="text-xl" to="/login">Login</NavLink>
                                </li>
                            </>
                        )
                            : <>
                                <li>
                                    <NavLink className="text-xl" to="/cart">Cart</NavLink>
                                </li>

                                <li className="drop-down-wrapper">
                                    <Dropdown className="" label={`Welcome, ${userData.user.username}`} dismissOnClick={false}>
                                        <Dropdown.Item>
                                            <Link className="block flex-1 text-start" to="/profile">Profile</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link className="block flex-1 text-start" to="/add-product">Add Product</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={onLogout}>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown>
                                </li>

                                {/* <button className="bg-white/20 text-[18px] leading-none py-[10px] px-[12px] rounded-md"
                                    onClick={onLogout}>
                                    Logout
                                </button>
                                <li>
                                    <span className="text-xl">Welcome, <b className="capitalize">{userData.user.username}</b></span>
                                </li> */}
                            </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default MyNavbar