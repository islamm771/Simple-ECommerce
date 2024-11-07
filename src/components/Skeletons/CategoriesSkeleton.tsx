import Wrapper from '../ui/Wrapper'

const CategoriesSkeleton = () => {
    return (
        <Wrapper classes="py-10 mb-10" title="Categories">
            <h2 className="text-2xl font-semibold mt-5">Browse By Category</h2>
            <div role="status" className="animate-pulse">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[0, 0, 0, 0].map((_, idx) => (
                        <div className="border border-gray-400 h-28 px-5 flex flex-col items-center justify-center gap-3 mt-8" key={idx}>
                            <div className="w-20 h-16 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                            <div className="w-full h-2 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}

export default CategoriesSkeleton