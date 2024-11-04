import { Outlet } from 'react-router-dom'
import MyNavbar from '../components/navbar'
import Footer from '../components/Home/Footer'

const RootLayout = () => {
    return (
        <>
            <MyNavbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout