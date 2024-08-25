import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { IAxiosError, IProduct } from "../interface";
import { AxiosError } from "axios";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductCard from "../components/ProductCard";

const Cart = () => {
    const userDataString = localStorage.getItem("userData")
    const userData = userDataString ? JSON.parse(userDataString) : null
    const { id: userId } = userData.user;

    const { isLoading, error, data } = useAuthenticatedQuery({
        queryKey: ["cart", userId],
        url: `/cart/${userId}`,
    })


    if (isLoading) return (
        <div className="container">
            <div role="status" className="animate-pulse">
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <ProductSkeleton />
                    <ProductSkeleton />
                    <ProductSkeleton />
                </div>
            </div>
        </div>
    )

    if (error && (error as AxiosError).response) {
        const axiosError = error as AxiosError<IAxiosError>;
        return <div className="container">
            <h2 className="text-center text-[25px] font-semibold mt-8">{`${axiosError.response?.data.error}`}</h2>
        </div>;
    }


    return (
        <div className="container">
            <div className="flex items-center justify-between mt-8">
                <h2 className="text-[25px] font-semibold">
                    Total: {data?.cart?.reduce((acc: number, curr: IProduct) => acc + curr.price * curr.quantity, 0).toFixed(2)}$
                </h2>
                <button className="bg-indigo-600 text-white p-2 rounded-md w-[250px]">Checkout</button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
                {data?.cart.length && data?.cart.map((product: IProduct) => (
                    <ProductCard product={product} qunatity={product.quantity} key={product.id} />
                ))}
            </div>
        </div>
    )
}

export default Cart