import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery"
import { IAxiosError, IProduct } from "../interface"
import ProductSkeleton from "../components/ProductSkeleton"
import { AxiosError } from "axios"
import ProductCard from "../components/ProductCard"

const Index = () => {

    const { isLoading, error, data } = useAuthenticatedQuery({
        queryKey: ["products"],
        url: "/products",
    })

    if (isLoading) return (
        <div className="container">
            <div role="status" className="animate-pulse grid grid-cols-3 gap-4 mt-8">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
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

            {data?.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {data.map((product: IProduct) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div> : (
                <div>
                    <h1 className="text-center text-[30px] mt-8 font-bold">No products yet!!</h1>
                </div>
            )}

        </div>
    )
}

export default Index