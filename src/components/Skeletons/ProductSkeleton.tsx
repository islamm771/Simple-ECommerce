
const ProductSkeleton = () => {
    return (
        <div>
            <div className='bg-gray-100 relative p-3 rounded-md overflow-hidden'>
                <div className="w-full h-52 rounded-sm bg-gray-200 dark:bg-gray-700 mb-2"></div>

                <ul className='space-y-1 absolute top-1 right-1'>
                    <li className='bg-white w-6 h-6 rounded-full'></li>
                    <li className='bg-white w-6 h-6 rounded-full'></li>
                </ul>
            </div>
            <div className="mt-3 space-y-2">
                <div className="w-3/4 h-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                <div className="w-20 h-4 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                <span className={"flex gap-1"}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <div className="w-4 h-4 rounded-sm bg-gray-200 dark:bg-gray-700" key={idx}></div>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default ProductSkeleton