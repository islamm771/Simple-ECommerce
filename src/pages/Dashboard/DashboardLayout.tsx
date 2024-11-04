import { Navbar, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, NavLink, Outlet } from 'react-router-dom';
import { getUserData } from '../../data';
import NavbarDropDown from '../../components/NavbarDropDown';


const DashboardLayout = () => {
    const user = getUserData();

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar fluid rounded>
                <Navbar.Brand as={Link} to="/dashboard">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Dashboard
                    </span>
                </Navbar.Brand>
                <div className="flex items-center">
                    <NavbarDropDown user={user} />
                </div>
            </Navbar>

            {/* Main content */}
            <div className="flex flex-grow gap-4">
                {/* Sidebar */}
                <Sidebar aria-label="Default sidebar example" as={'aside'}>
                    <Sidebar.Items className='flex flex-col h-full'>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item as={NavLink} to="/dashboard" icon={HiChartPie} end>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/dashboard/users" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/dashboard/products" icon={HiShoppingBag}>
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/dashboard/categories" icon={HiViewBoards}>
                                Categories
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup className='mt-auto'>
                            {!user ? (
                                <>
                                    <Sidebar.Item href="/login" icon={HiArrowSmRight}>
                                        Sign In
                                    </Sidebar.Item>
                                    <Sidebar.Item href="#" icon={HiTable}>
                                        Sign Up
                                    </Sidebar.Item>
                                </>
                            ) :
                                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                    Sign Out
                                </Sidebar.Item>
                            }
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                {/* Content area */}
                <div className="flex-grow bg-white p-6 rounded-lg shadow-lg m-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;