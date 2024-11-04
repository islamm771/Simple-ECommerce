import { FaRegCopyright } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="container py-10 grid md:grid-cols-3 lg:grid-cols-5 gap-5">
                <section>
                    <h3 className="text-lg font-semibold mb-4">E-Commerce</h3>
                    <p>Subscribe</p>
                </section>
                <section>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li className="text-gray-300 text-sm">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</li>
                        <li className="text-gray-300 text-sm">exclusive@gmail.com</li>
                        <li className="text-gray-300 text-sm">+88015-88888-9999</li>
                    </ul>
                </section>
                <section>
                    <h3 className="text-lg font-semibold mb-4">Account</h3>
                    <ul className="space-y-3">
                        <li className="text-gray-300 text-sm">My Account</li>
                        <li className="text-gray-300 text-sm">Login / Register</li>
                        <li className="text-gray-300 text-sm">Cart</li>
                        <li className="text-gray-300 text-sm">Wishlist</li>
                        <li className="text-gray-300 text-sm">Shop</li>
                    </ul>
                </section>
                <section>
                    <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
                    <ul className="space-y-3">
                        <li className="text-gray-300 text-sm">Privacy Policy</li>
                        <li className="text-gray-300 text-sm">Terms Of Use</li>
                        <li className="text-gray-300 text-sm">FAQ</li>
                        <li className="text-gray-300 text-sm">Contact</li>
                    </ul>
                </section>
                <section>
                    <h3 className="text-lg font-semibold mb-4">Download App</h3>
                    <p className="text-gray-300 text-xs">Save $3 with App New User Only</p>
                </section>
            </div>
            <h3 className="text-center text-gray-700 pb-3"> <FaRegCopyright className="inline" /> Copyright Rimel 2022. All right reserved</h3>
        </footer>
    )
}

export default Footer