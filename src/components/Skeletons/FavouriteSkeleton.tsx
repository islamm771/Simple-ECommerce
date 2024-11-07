import ProductSkeleton from './ProductSkeleton'

const FavouriteSkeleton = () => {
    return (
        <div className="container py-10">
            <div role="status" className="animate-pulse">
                <div className="w-32 h-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                    <ProductSkeleton />
                    <ProductSkeleton />
                    <ProductSkeleton />
                    <ProductSkeleton />
                </div>

                <div className='mt-20'>
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-8 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                        <div className="w-32 h-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                        {[0, 0, 0, 0].map((_, idx) => (
                            <ProductSkeleton key={idx} />
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouriteSkeleton