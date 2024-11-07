import { useLocation } from "react-router-dom"
import { IProduct } from "../interface"
import ProductCard from "../components/ProductCard"
import PathElement from "../components/PathElement"
import NotFoundItems from "../components/NotFoundItems"

const Search = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get('q')
    const data = location.state as IProduct[]
    return (
        <div className="container">
            <PathElement pathes={"Products /"} indexPath={`${searchQuery}`} />
            {data && data.length ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                    {data.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) :
                <div className="pt-[90px] pb-[155.5px]">
                    <NotFoundItems msg="Item Is Not Found" />
                </div>
            }
        </div>
    )
}

export default Search