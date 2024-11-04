import { AxiosError } from "axios";
import { useGetAllProductsQuery } from "../../app/features/ProductsSlice";
import { IAxiosError, IProduct } from "../../interface";
import NotFoundItems from "../NotFoundItems";
import ProductCard from "../ProductCard";
import ProductSkeleton from "../ProductSkeleton";
import Wrapper from "../ui/Wrapper";
import Button from "../ui/button";



const ProductList = () => {
    const { isLoading, error, data } = useGetAllProductsQuery();

    if (isLoading) return (
        <div className="container">
            <div role="status" className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
        <Wrapper title="Our Products" classes="mb-16">
            <h2 className="text-2xl font-semibold mt-5">Explore Our Products</h2>
            {data?.length ? <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                {data.map((product: IProduct) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div> : (
                <NotFoundItems msg="No products are added" />
            )}

            <Button width="w-fit" centered>View All Products</Button>
        </Wrapper>
    )
}

export default ProductList