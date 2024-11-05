import { useEffect, useRef, useState } from "react";
import { IUser } from "../interface";
import toast from "react-hot-toast";

interface IProps {
    user: {
        token: string;
        user: IUser;
    }
}

const NavbarDropDown = ({ user }: IProps) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const onLogout = () => {
        localStorage.removeItem("userData")
        toast.success(`Logout successful`, {
            position: "top-right",
            duration: 1000
        });
        setTimeout(() => {
            location.reload();
        }, 1200);
    }

    const handleOutsideClickDrop = (e: MouseEvent) => {
        // Check if the click target is outside the dropdown element
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setDropdownOpen(false); // Close the dropdown
        }
    };


    useEffect(() => {
        // Add the mousedown event listener
        document.addEventListener("mousedown", handleOutsideClickDrop);

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleOutsideClickDrop);
        };
    }, []);


    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
            </button>
            {isDropdownOpen && (
                <div className="absolute lg:right-0 z-50 mt-2 w-48 py-2 bg-white rounded shadow-lg dark:bg-gray-700">
                    <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 capitalize dark:text-white">{user.user.username}</p>
                        <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-300">{user.user.email}</p>
                    </div>
                    <ul className="py-1">
                        <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a></li>
                        <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a></li>
                        <li><button className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onLogout}>Sign out</button></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default NavbarDropDown