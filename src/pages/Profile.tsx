import { getUserData } from "../data"

const Profile = () => {
    const userData = getUserData()
    const { user } = userData
    return (
        <div className="container">
            <div className="flex flex-col items-center max-w-[550px] py-8 mx-auto my-44 shadow-[0px_0px_7px_0px_#ddd] rounded-3xl">
                <div>
                    <img className="w-72 -mt-36" src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="" />
                </div>
                <div className="text-center py-4">
                    <h2 className="text-[30px] font-bold capitalize">{user.username}</h2>
                    <p className="text-[20px]">{user.email}</p>
                    <p className="text-[20px]">{user.gender}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile