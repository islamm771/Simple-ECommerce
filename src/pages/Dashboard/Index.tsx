import { FaUser } from "react-icons/fa";
import { getUserData } from "../../data";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery"
import { BiSolidCategory } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";

const Dashboard = () => {
    const user = getUserData();
    const { data } = useAuthenticatedQuery({
        queryKey: ["count"],
        url: "/count/all",
        config: {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        }
    })
    return (
        <div className="grid lg:grid-cols-3 gap-5">
            <div className="p-4 pt-6 pb-8 shadow-md rounded-md">
                <h3 className="text-xl mb-3 flex items-center gap-2">
                    <FaUser />
                    Users
                </h3>
                <p>Total users: {data?.counts.users}</p>
            </div>
            <div className="p-4 pt-6 pb-8 shadow-md rounded-md">
                <h3 className="text-xl mb-3 flex items-center gap-2">
                    <MdProductionQuantityLimits size={23} />
                    Products
                </h3>
                <p>Total products: {data?.counts.products}</p>
            </div>
            <div className="p-4 pt-6 pb-8 shadow-md rounded-md">
                <h3 className="text-xl mb-3 flex items-center gap-2">
                    <BiSolidCategory size={25} />
                    Categories
                </h3>
                <p>Total categories: {data?.counts.categories}</p>
            </div>
        </div>
    )
}

export default Dashboard