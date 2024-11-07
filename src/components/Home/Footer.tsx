import { CiTwitter } from "react-icons/ci"
import { FaRegCopyright } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io"
import { RiFacebookLine, RiLinkedinLine } from "react-icons/ri"
import { AiOutlineSend } from "react-icons/ai";


const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="container py-10 grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                <section>
                    <h3 className="text-lg font-semibold mb-4">E-Commerce</h3>
                    <p className="mb-4">Subscribe</p>
                    <p className="text-sm font-light">Get 10% off your first order</p>
                    <div className="relative mt-2.5">
                        <input className="w-full bg-transparent text-[14px] border-white rounded-sm pr-9" type="email" placeholder="Enter your email" />
                        <AiOutlineSend className="absolute top-2.5 right-1.5" size={20} />
                    </div>
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
                    <p className="text-gray-300 text-xs mb-4">Save $3 with App New User Only</p>
                    <ul className="flex items-center gap-4">
                        <li><RiFacebookLine size={25} /></li>
                        <li><CiTwitter size={27} /></li>
                        <li><IoLogoInstagram size={25} /></li>
                        <li><RiLinkedinLine size={25} /></li>
                    </ul>
                </section>
            </div>
            <h3 className="text-center text-gray-700 pb-3"> <FaRegCopyright className="inline" /> Copyright Rimel 2022. All right reserved</h3>
        </footer>
    )
}

export default Footer