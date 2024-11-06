import { Navbar, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, NavLink, Outlet } from 'react-router-dom';
import { getUserData } from '../../data';
import NavbarDropDown from '../../components/NavbarDropDown';
import { useState } from 'react';


const DashboardLayout = () => {
    const user = getUserData();
    const [showAside, setShowAside] = useState(false);
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar fluid className='border border-solid border-gray-300'>
                <Navbar.Toggle aria-label="Toggle sidebar" onClick={() => setShowAside(prev => !prev)} />
                <Navbar.Brand as={Link} to="/dashboard">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Dashboard
                    </span>
                </Navbar.Brand>
                <NavbarDropDown user={user} />
            </Navbar>

            {/* Main content */}
            <div className={`flex flex-grow gap-4 relative`}>
                {/* Sidebar */}
                <Sidebar className={`hidden md:block ${showAside ? "block absolute z-10" : ""}`} aria-label="Default sidebar example" as={'aside'}>
                    <Sidebar.Items className='flex flex-col h-full'>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item as={NavLink} to="/dashboard" icon={HiChartPie} end onClick={() => setShowAside(false)}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/dashboard/users" icon={HiUser} onClick={() => setShowAside(false)}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/dashboard/products" icon={HiShoppingBag} onClick={() => setShowAside(false)}>
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item as={NavLink} to="/dashboard/categories" icon={HiViewBoards} onClick={() => setShowAside(false)}>
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
                {/* Overlay under aside */}
                {showAside && (
                    <div className='overlay absolute top-0 left-0 size-full bg-black/50 z-[5]'>

                    </div>
                )}
                {/* Content area */}
                <div className="flex-grow bg-white p-6 h-full overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
