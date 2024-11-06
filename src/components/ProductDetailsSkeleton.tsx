import PathElement from './PathElement'
import ProductSkeleton from './ProductSkeleton'

const ProductDetailsSkeleton = () => {
    return (
        <div className="container pb-8">
            <PathElement pathes={`Category /`} indexPath={"Title"} />
            <div role="status" className="animate-pulse">
                <div className="flex flex-col lg:flex-row gap-y-8">
                    <div className="md:flex-1 pr-4 flex flex-col-reverse md:flex-row gap-4 min-h-[460px]">
                        <ul className='h-[80px] md:h-[460px] flex md:flex-col gap-4'>
                            {[0, 0, 0, 0].map((_, idx) => (
                                <li className='flex-grow' key={idx}>
                                    <div className="size-full md:size-[100px] object-cover rounded-md  bg-gray-200 dark:bg-gray-700"></div>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full h-64 md:h-[460px] rounded-md flex-1 bg-gray-200 dark:bg-gray-700">
                        </div>

                    </div>
                    <div className="md:max-w-[420px] px-4">
                        <div className="w-48 h-2 rounded-sm bg-gray-200 dark:bg-gray-700 mb-4"></div>

                        <div className='flex items-center gap-4 mb-3'>
                            <span className={"flex gap-1"}>
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div className="w-4 h-4 rounded-sm bg-gray-200 dark:bg-gray-700" key={idx}></div>
                                ))}
                            </span>
                            <div className="w-28 h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                            <div className="w-28 h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>

                        </div>

                        <div className="price w-48 h-2 rounded-sm bg-gray-200 dark:bg-gray-700 mb-4"></div>

                        <div className='describtion'>
                            <div className="describtion w-80 h-2 rounded-sm bg-gray-200 dark:bg-gray-700 mb-2.5"></div>
                            <div className="describtion w-72 h-2 rounded-sm bg-gray-200 dark:bg-gray-700 mb-2.5"></div>
                            <div className="describtion w-72 h-2 rounded-sm bg-gray-200 dark:bg-gray-700 mb-4"></div>
                        </div>
                        <hr className='mb-4' />


                        <div className="flex items-center gap-4 mb-4 color">
                            <div className="w-24 h-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex items-center gap-1">
                                {[0, 0, 0, 0].map((_, idx) => (
                                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" key={idx}></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mb-4 size">
                            <div className="describtion w-16 h-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex items-center gap-1.5">
                                {[0, 0, 0, 0, 0].map((_, idx) => (
                                    <div className="w-8 h-8 rounded-sm bg-gray-200 dark:bg-gray-700" key={idx}></div>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-3 buy'>
                            <div className="flex">
                                <div className="w-16 h-10 rounded-l-sm bg-gray-200 dark:bg-gray-700"></div>
                                <div className="w-16 h-10 border-x border-gray-400 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="w-16 h-10 rounded-r-sm bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <div className="w-40 h-10 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                            <div className="w-12 h-10 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <ul className="border border-solid border-gray-300 rounded-sm mt-8 divide-y divide-gray-300 tags">
                            <li className='flex items-center gap-3 p-3'>
                                <div className="w-8 h-8 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                <div>
                                    <div className="w-32 h-2 rounded-sm bg-gray-200 dark:bg-gray-700 mb-2"></div>
                                    <div className="w-64 h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                            </li>
                            <li className='flex items-center gap-3 p-3'>
                                <div className="w-8 h-8 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                <div>
                                    <div className="w-32 h-2 rounded-sm bg-gray-200 dark:bg-gray-700 mb-2"></div>
                                    <div className="w-64 h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
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

export default ProductDetailsSkeleton