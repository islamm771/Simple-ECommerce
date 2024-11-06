import { BiSolidCategory } from "react-icons/bi";
import { CiLaptop, CiMobile4 } from "react-icons/ci";
import { FaTshirt } from "react-icons/fa";
import { PiWatch } from "react-icons/pi";
import { useGetAllCategoriesQuery } from "../../app/features/CategoriesSlice";
import { ICategory } from "../../interface";
import CategoriesSkeleton from "../CategoriesSkeleton";
import NotFoundItems from "../NotFoundItems";
import Swiper from "../Swiper";
import Wrapper from "../ui/Wrapper";

// Map category names to specific icons
const iconMap: Record<string, JSX.Element> = {
    "mobile": <CiMobile4 size={30} />,
    "laptops": <CiLaptop size={30} />,
    "accessories": <PiWatch size={30} />,
    "clothes": <FaTshirt size={30} />,
};


const Categories = () => {
    const { isLoading, data } = useGetAllCategoriesQuery()

    const slides = data?.map((category: ICategory) => (
        <div key={category.id} className="border border-solid border-gray-300 p-5 flex flex-col items-center text-xl cursor-pointer hover:bg-red-600 hover:text-white">
            {iconMap[category.name.toLowerCase()] || <BiSolidCategory size={30} />}
            <h3>{category.name}</h3>
        </div>
    ))

    if (isLoading) {
        return (
            <CategoriesSkeleton />
        )
    }

    return (
        <Wrapper classes="py-10 mb-10" title="Categories">
            <h2 className="text-2xl font-semibold mt-5">Browse By Category</h2>
            {data?.length ? (
                <Swiper
                    slidesPerView={1}
                    className="hero-swiper !pb-16 mt-8"
                    slides={slides || []}
                    spaceBetween={30}
                    pagination={true}
                    breakpoints={{
                        330: { slidesPerView: 2 },
                        545: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                />
            ) : (
                <NotFoundItems msg="No Categories are added" />
            )}
        </Wrapper>
    )
}



export default Categories;