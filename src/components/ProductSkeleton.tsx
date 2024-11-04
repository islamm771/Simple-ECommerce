
const ProductSkeleton = () => {
    return (
        <div className="border rounded-md shadow-md space-y-4">
            <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-3 p-4">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                </div>
                <div className="flex justify-between">
                    <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
            </div>
        </div >
    )
}

export default ProductSkeleton