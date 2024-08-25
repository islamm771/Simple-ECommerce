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
            <div className="grid grid-cols-3 gap-4 mt-8">
                {data.length ? data.map((product: IProduct) => (
                    <ProductCard product={product} key={product.id} />
                )) : <div>No products yet!!</div>}
            </div>
        </div>
    )
}

export default Index