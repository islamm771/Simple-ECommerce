import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus, FaRegHeart, FaStar, FaTimes } from 'react-icons/fa';
import { FaTruckFast } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddToCartMutation } from '../app/features/CartSlice';
import { useGetProductByIdQuery, useGetRelatedProductsQuery } from '../app/features/ProductsSlice';
import PathElement from '../components/PathElement';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/button';
import Wrapper from '../components/ui/Wrapper';
import { IProduct } from '../interface';
import { AxiosError } from 'axios';
import { getUserData } from '../data';
import ProductDetailsSkeleton from '../components/Skeletons/ProductDetailsSkeleton';
import { useFavorites } from '../hooks/useFavourites';

const Product = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    const [quantity, setQuantity] = useState(1);
    const userData = getUserData();
    const { isLoading, error, data } = useGetProductByIdQuery({ id: id })
    const productData = data as IProduct;
    const [addToCart, { isSuccess: isAddingSuccess, error: AddingError }] = useAddToCartMutation();
    const { handleAddToFav, favouritesData } = useFavorites(userData);
    const { data: relatedProducts } = useGetRelatedProductsQuery({ id: id })

    const handleAddToCart = async (productId: number) => {
        if (!userData) {
            navigate("/login");
            return;
        }
        const { id: userId } = userData.user;
        addToCart({
            userId,
            products: [{ productId, quantity }]
        })
    }

    useEffect(() => {
        if (isAddingSuccess) {
            toast.success('Product is added to card', {
                position: "top-right",
                duration: 2000
            })
        }
        if (AddingError) {
            toast.error(`Failed adding product to cart`, {
                position: "top-right",
                duration: 3000
            })
        }
    }, [isAddingSuccess, AddingError]);

    if (isLoading) return (
        <ProductDetailsSkeleton />
    )

    if (error) {
        const errorObj = error as AxiosError
        return <div className='container'> {errorObj.message} </div>
    }


    return (
        <>
            <div className="container">
                <PathElement pathes={`${productData.category} / `} indexPath={productData.title} />
                <div className="mt-16">
                    <div className="flex flex-col lg:flex-row gap-y-8 -mx-4">
                        <div className="md:flex-1 px-4 flex flex-col-reverse md:flex-row gap-4">
                            <ul className='h-auto md:h-[460px] flex md:flex-col gap-4'>
                                <li className='flex-1'>
                                    <img className="size-[100px] object-cover rounded-md border border-solid border-gray-300"
                                        src={productData.image ? productData.image : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                                        alt="Product Image" />
                                </li>
                                <li className='flex-1'>
                                    <img className="size-[100px] object-cover rounded-md border border-solid border-gray-300"
                                        src={productData.image ? productData.image : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                                        alt="Product Image" />
                                </li>
                                <li className='flex-1'>
                                    <img className="size-[100px] object-cover rounded-md border border-solid border-gray-300"
                                        src={productData.image ? productData.image : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                                        alt="Product Image" />
                                </li>
                                <li className='flex-1'>
                                    <img className="size-[100px] object-cover rounded-md border border-solid border-gray-300"
                                        src={productData.image ? productData.image : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                                        alt="Product Image" />
                                </li>
                            </ul>
                            <div className="h-[460px] rounded-md mb-4 flex-1">
                                <img className="w-full h-full object-cover rounded-md border border-solid border-gray-300"
                                    src={productData.image ? productData.image : "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"}
                                    alt="Product Image" />
                            </div>

                        </div>
                        <div className="max-w-[420px] px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{productData.title}</h2>
                            <div className='flex items-center gap-4 mb-2'>
                                <span className={"flex"}>
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <FaStar key={idx} color={idx + 1 < 3 ? "gold" : "gray"} />
                                    ))}
                                </span>
                                <p className='text-gray-400'>(150 Reviews)</p>
                                <p className='text-green-400 border-l border-solid border-gray-400 pl-4'>In Stock</p>
                            </div>
                            <p className="text-2xl mb-4 price">
                                ${productData.price}
                            </p>
                            <p className="text-black text-sm mb-4 description">
                                {productData.description}
                            </p>
                            <hr className='mb-4' />
                            <div className="flex items-center gap-4 mb-4 color">
                                <span className="">Colors:</span>
                                <div className="flex items-center">
                                    <button className="w-4 h-4 rounded-full bg-gray-800 dark:bg-gray-200 mr-2 flex items-center justify-center"><FaTimes size={10} color='white' /></button>
                                    <button className="w-4 h-4 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                    <button className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                    <button className="w-4 h-4 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-4 size">
                                <span className="">Size:</span>
                                <div className="flex items-center gap-2">
                                    <button className="py-0 px-2 rounded-sm border border-solid border-black hover:bg-red-500 hover:text-white hover:border-red-500">S</button>
                                    <button className="py-0 px-2 rounded-sm border border-solid border-black hover:bg-red-500 hover:text-white hover:border-red-500">M</button>
                                    <button className="py-0 px-2 rounded-sm border border-solid border-black hover:bg-red-500 hover:text-white hover:border-red-500">L</button>
                                    <button className="py-0 px-2 rounded-sm border border-solid border-black hover:bg-red-500 hover:text-white hover:border-red-500">XL</button>
                                    <button className="py-0 px-2 rounded-sm border border-solid border-black hover:bg-red-500 hover:text-white hover:border-red-500">XXL</button>
                                </div>
                            </div>
                            <div className='flex gap-3 buy'>
                                <div className="flex">
                                    <button className='px-5 border border-solid border-gray-300 rounded-l-[4px] disabled:opacity-50 disabled:cursor-not-allowed' disabled={quantity == 1} onClick={() => setQuantity(prev => prev - 1)}><FaMinus /></button>
                                    <span className='px-5 py-1 border boder-solid border-gray-300 flex items-center'>{quantity}</span>
                                    <button className='px-5 bg-red-500 text-white rounded-r-[4px] disabled:opacity-50 disabled:cursor-not-allowed' disabled={quantity == productData.count} onClick={() => setQuantity(prev => prev + 1)}><FaPlus /></button>
                                </div>
                                <Button width='w-fit' onClick={() => handleAddToCart(productData.id)}>
                                    Buy now
                                </Button>
                                <span
                                    className={`px-3 flex items-center justify-center rounded-[4px] cursor-pointer
                                        ${favouritesData && favouritesData.favourites.find(fav => fav.id === productData.id) ? 'text-white bg-red-500' : 'bg-white border border-solid border-gray-300'}`}
                                    onClick={() => handleAddToFav(productData.id)}>
                                    <FaRegHeart />
                                </span>
                            </div>
                            <ul className="border border-solid border-gray-300 rounded-sm mt-8 divide-y divide-gray-300 tags">
                                <li className='flex items-center gap-3 p-3'>
                                    <FaTruckFast size={25} />
                                    <div>
                                        <h5 className='font-semibold'>Free Delivery</h5>
                                        <p className='text-xs underline'>Enter your postal code for Delivery Availability</p>
                                    </div>
                                </li>
                                <li className='flex items-center gap-3 p-3'>
                                    <TfiReload size={20} />
                                    <div>
                                        <h5 className='font-semibold'>Return Delivery</h5>
                                        <p className='text-xs'>Free 30 Days Delivery Returns. Details</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Wrapper title='Related Items'>
                {relatedProducts && relatedProducts?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                        {relatedProducts.map(relatedProduct => (<ProductCard product={relatedProduct} key={relatedProduct.id} />)
                        )}
                    </div>
                ) :
                    <div className="mt-8">
                        <p className="text-gray-500">No related items yet.</p>
                    </div>
                }
            </Wrapper>

        </>

    )
}

export default Product