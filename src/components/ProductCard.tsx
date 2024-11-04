import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAddToCartMutation } from "../app/features/CartSlice"
import { IProduct } from "../interface"
import { getUserData } from "../data"
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { RiShoppingCart2Line } from "react-icons/ri"
import { Link } from "react-router-dom"


interface IProps {
    product: IProduct,
    isSale?: boolean
}

const ProductCard = ({ product, isSale }: IProps) => {
    const [isCardHovered, setIsCardHovered] = useState(false)
    const userData = getUserData();
    const [addToCart, { isSuccess: isAddingSuccess }] = useAddToCartMutation();

    const handleAddToCart = async (productId: number) => {
        if (!userData) {
            toast.error('Please log in to add products to cart', {
                position: "top-right",
                duration: 2000
            })
            return;
        }
        const { id: userId } = userData.user;
        try {
            addToCart({
                userId,
                products: [{ productId, quantity: 1 }]
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isAddingSuccess) {
            toast.success('Product is added to card', {
                position: "top-right",
                duration: 2000
            })
        }
    }, [isAddingSuccess]);

    return (
        <div onMouseEnter={() => setIsCardHovered(prev => !prev)} onMouseLeave={() => setIsCardHovered(prev => !prev)}>
            <div className='bg-gray-100 relative p-3 rounded-md overflow-hidden'>
                {isSale && (
                    <span className='bg-red-600 text-white text-center w-11 py-1 block rounded-md text-xs absolute top-1 left-1 z-10'> -40% </span>
                )}
                <Link to={`/products/${product.id}`} className='block font-semibold'>
                    <img className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110" src={product.image} alt={product.title} />
                </Link>
                <ul className='space-y-1 absolute top-1 right-1'>
                    <li className='bg-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer'><FaRegHeart /></li>
                    <li className='bg-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer'><MdOutlineRemoveRedEye /></li>
                </ul>
                <button
                    className={`w-full bg-black text-white text-sm flex items-center gap-1 justify-center absolute ${isCardHovered ? 'bottom-0' : '-bottom-full'} left-0 rounded-b-md py-1.5 transition-[bottom] ease-linear duration-500`}
                    onClick={() => handleAddToCart(product.id)}>
                    <RiShoppingCart2Line />
                    Add To Cart
                </button>
            </div>
            <div className="mt-3 space-y-1">
                <Link to={`/products/${product.id}`} className='block font-semibold'>{product.title}</Link>
                <span className='text-red-600'>${product.price}</span>
                {isSale && <span className='text-gray-600 line-through ml-2'>${product.price + 80}</span>}
                <span className={`${isSale ? "flex" : "inline-flex ml-2 my-0"}`}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <FaStar key={idx} color={idx + 1 < 3 ? "gold" : "gray"} />
                    ))}
                </span>
            </div>
        </div >
    )
}


export default ProductCard