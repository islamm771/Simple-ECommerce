import { useParams } from 'react-router-dom'
import useAuthenticatedQuery from '../hooks/useAuthenticatedQuery'
import { IProduct } from '../interface'
import { axiosInstance } from '../config/axios.config'
import toast from 'react-hot-toast'
import { FaTimes } from 'react-icons/fa'

const Product = () => {
    const { id } = useParams()

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

    const { isLoading, error, data } = useAuthenticatedQuery({
        queryKey: ['product', `${id ? id : ''}`],
        url: `/products/${id}`,
    })

    if (isLoading) return <p>Loading...</p>

    if (error) return <div className='container'> {error.message} </div>

    const productData = data as IProduct;

    return (
        <div className="container">
            <div className="mt-16">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-indigo-600 dark:bg-indigo-400 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-700 dark:hover:bg-indigo-700"
                                    onClick={() => handleAddToCart(productData.id)}>Add to Cart</button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{productData.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                            ante justo. Integer euismod libero id mauris malesuada tincidunt.
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                <span className="text-gray-600 dark:text-gray-300">${productData.price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Category: </span>
                                <span className="text-gray-600 dark:text-gray-300">{productData.category}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                            <div className="flex items-center mt-2">
                                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2 flex items-center justify-center"><FaTimes size={14} color='white' /></button>
                                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                            <div className="flex items-center mt-2">
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {productData.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product