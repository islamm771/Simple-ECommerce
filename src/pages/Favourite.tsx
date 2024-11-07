import { useGetFavouriteQuery } from "../app/features/FavouritesSlice"
import ProductCard from "../components/ProductCard"
import FavouriteSkeleton from "../components/Skeletons/FavouriteSkeleton"
import Wrapper from "../components/ui/Wrapper"
import { getUserData } from "../data"
import { IProduct } from "../interface"

const Favourite = () => {
    const userData = getUserData()
    const { id: userId } = userData.user
    const { isLoading, data } = useGetFavouriteQuery({ userId: userId })
    const relatedProducts: IProduct[] = []

    if (isLoading) return (
        <FavouriteSkeleton />
    )


    console.log(data)
    return (
        <div className="min-h-[375px]">
            <div className='container py-8'>
                <h3 className="mb-6">WishList(0)</h3>
                {data?.favourites.length ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
                        {data.favourites.map(product => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No favourite items yet.</p>
                )}
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
        </div >
    )
}

export default Favourite