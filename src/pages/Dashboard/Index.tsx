import { getUserData } from "../../data";
import useAuthenticatedQuery from "../../hooks/useAuthenticatedQuery"

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
            <div className="p-4 shadow-md rounded-md">
                <h3 className="text-xl mb-3">Users</h3>
                <p>Total users: {data?.counts.users}</p>
            </div>
            <div className="p-4 shadow-md rounded-md">
                <h3 className="text-xl mb-3">Product</h3>
                <p>Total product: {data?.counts.products}</p>
            </div>
            <div className="p-4 shadow-md rounded-md">
                <h3 className="text-xl mb-3">Categories</h3>
                <p>Total categories: {data?.counts.categories}</p>
            </div>
        </div>
    )
}

export default Dashboard