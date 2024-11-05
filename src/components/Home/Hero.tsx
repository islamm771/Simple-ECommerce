import { GoArrowRight } from "react-icons/go";
import Swiper from "../Swiper";

const slides = [
    <div className='w-full lg:h-80 bg-black text-white grid lg:grid-cols-2'>
        <div className='p-4 lg:p-16'>
            <h1 className='text-[30px] font-semibold mb-6'>
                Up to 10% off Voucher
            </h1>
            <button className="flex items-center gap-1">
                <span className="border-b border-solid border-gray-400">Shop Now</span>
                <GoArrowRight className="mt-1" />
            </button>
        </div>
        <div className='p-4'>
            <img className="h-full" src="/imgs/hero-img.png" alt="" />
        </div>
    </div>,
    <div className='w-full lg:h-80 bg-black text-white grid lg:grid-cols-2'>
        <div className='p-4 lg:p-16'>
            <h1 className='text-[30px] font-semibold mb-6'>
                New Arrivals!
            </h1>
            <button className="flex items-center gap-1">
                <span className="border-b border-solid border-gray-400">Discover</span>
                <GoArrowRight className="mt-1" />
            </button>
        </div>
        <div className='lg:p-4'>
            <img className="h-full" src="/imgs/sm-s24.avif" alt="" />
        </div>
    </div>
];


const Hero = () => {
    return (
        <header className="grid grid-cols-12 container mb-20">
            <aside className="col-span-3 border-r border-solid border-gray-300 py-4 lg:py-8">
                <ul className='flex flex-col justify-between h-full'>
                    <li className='cursor-pointer hover:underline'>Woman’s Fashion</li>
                    <li className='cursor-pointer hover:underline'>Men’s Fashion</li>
                    <li className='cursor-pointer hover:underline'>Electronics</li>
                    <li className='cursor-pointer hover:underline'>Home & Lifestyle</li>
                    <li className='cursor-pointer hover:underline'>Medicine</li>
                    <li className='cursor-pointer hover:underline'>Sports & Outdoor</li>
                    <li className='cursor-pointer hover:underline'>Health & Beauty</li>
                </ul>
            </aside>
            <div className="col-span-9 p-4 lg:p-8">
                <Swiper
                    slidesPerView={1}
                    className="hero-swiper"
                    slides={slides}
                    spaceBetween={30}
                    loop={true}
                    pagination={true}
                    autoplay={true}
                />
            </div>
        </header>
    )
}

export default Hero