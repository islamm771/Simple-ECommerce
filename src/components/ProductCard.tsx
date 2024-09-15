import { FaStar } from "react-icons/fa"
import { IProduct } from "../interface"
import { TextSpliter, TitleSpliter } from "../utility"
import { IoIosPricetag } from "react-icons/io"
import { axiosInstance } from "../config/axios.config"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

interface IProps {
    product: IProduct,
    qunatity?: number
}

const ProductCard = ({ product, qunatity }: IProps) => {
    const userDataString = localStorage.getItem("userData")
    const userData = userDataString ? JSON.parse(userDataString) : null
    const { id: userId } = userData.user;

    const handleAddToCart = async (productId: number) => {
        try {
            const { status } = await axiosInstance.post("/cart/add", {
                userId,
                productId,
                quantity: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            })
            if (status === 200 || status === 201) {
                toast.success('Product is added to card', {
                    position: "top-right",
                    duration: 2000
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveFromCart = async (productId: number) => {
        try {
            console.log(userId, productId)
            const { status } = await axiosInstance.post("/cart/remove", {
                userId,
                productId,
            }, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            })
            if (status === 200 || status === 201) {
                toast.success('Product is removed from card', {
                    position: "top-right",
                    duration: 1000
                })
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="product-card shadow-md p-4 rounded-lg space-y-4 relative">
        <h3 className="font-bold text-[20px]">
            <Link to={`/products/${product.id}`}>{TitleSpliter(product.title)}</Link>
        </h3>
        {qunatity && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold w-8 h-8 flex items-center justify-center rounded-full absolute top-0 right-2">
                {product.quantity}
            </span>
        )}
        <div className="rating flex items-center gap-6">
            <span className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                        className={`${Math.round(product.rating.rate) > idx ? "text-yellow-300" : "text-gray-400"}`}
                        key={idx}
                    />
                ))}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{product.rating.rate}</span>
        </div>
        <p> {TextSpliter(product.description)} </p>
        <ul className="flex items-center justify-between font-semibold space-x-3">
            <li className="flex items-center gap-1"><IoIosPricetag /> {product.category}</li>
            {/* <li>{product.rating.count}</li> */}
            <li className="text-[22px]">{product.price}$</li>
        </ul>
        {!qunatity ? (
            <button className="bg-indigo-600 text-white p-2 rounded-md w-full !mt-8"
                onClick={() => handleAddToCart(product.id)}
            >Add to cart</button>
        ) : (
            <button className="bg-red-600 text-white p-2 rounded-md w-full !mt-8"
                onClick={() => { handleRemoveFromCart(product.id) }}>
                Remove from cart
            </button>
        )}
    </div>
}


export default ProductCard