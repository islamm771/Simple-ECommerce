import { useLocation } from "react-router-dom"
import { IProduct } from "../interface"
import ProductCard from "../components/ProductCard"
import PathElement from "../components/PathElement"

const Search = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get('q')
    const data = location.state as IProduct[]
    return (
        <div className="container">
            <PathElement pathes={"Products /"} indexPath={`${searchQuery}`} />
            <div className="grid grid-cols-4 gap-4 my-8">
                {data.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Search