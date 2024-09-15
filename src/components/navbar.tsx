import { Dropdown } from "flowbite-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";

const MyNavbar = () => {
    const userDataString = localStorage.getItem("userData")
    const userData = userDataString ? JSON.parse(userDataString) : null

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

    useEffect(() => {
        // pageYOffset >= 200 ? set
    }, [])
    return (
        <nav className="bg-indigo-700 sticky top-0 z-10 text-white p-4">
            <div className="container flex">
                <Link className="font-bold text-2xl" to="/" >E-Commerce</Link>
                <ul className="flex items-center gap-6 ml-auto flex-col md:flex-row">
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