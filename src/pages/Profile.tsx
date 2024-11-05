import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaBars } from "react-icons/fa"
import { useGetProfileQuery, useUpdateProfileMutation } from "../app/features/ProfileSlice"
import InputErrorMessage from "../components/InputErrorMessage"
import PathElement from "../components/PathElement"
import Button from "../components/ui/button"
import { IProfileForm } from "../interface"
import { profileSchema } from "../validation"
import { IoIosArrowRoundBack } from "react-icons/io";

const Profile = () => {
    const [showAside, setShowAside] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProfileForm>({ resolver: yupResolver(profileSchema) })
    const { data } = useGetProfileQuery()
    const [updateProfile, { isSuccess, error, isLoading }] = useUpdateProfileMutation()

    const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
        updateProfile(data)
    }

    useEffect(() => {
        if (data) {
            reset({
                firstName: data?.firstName || "",
                lastName: data?.lastName || "",
                email: data?.email || "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
                address: data?.address || "",
            })
        }
    }, [data, reset]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Your Profile is updated successfully', {
                position: "top-right",
                duration: 1500
            })
        }
        if (error) {
            const errorObj = error as { data: { error: "string" } }
            toast.error(`${errorObj.data.error}`, {
                position: "top-right",
                duration: 3000
            })
        }
    }, [isSuccess, error]);


    return (
        <div className="container">
            <div className="flex items-center justify-between">
                <PathElement indexPath="My Account" />
                <p>Welcome! <span className="text-red-500 capitalize">{data?.username}</span></p>
            </div>
            <div className="grid grid-cols-12 gap-4 my-12 relative">
                <aside className={`bg-white ${showAside ? 'absolute z-10 w-full h-full py-4 px-5 rounded-md block' : 'hidden'}  md:col-span-3`}>
                    <button onClick={() => setShowAside(false)}>
                        <IoIosArrowRoundBack size={30} />
                    </button>
                    <ul className="space-y-6">
                        <li>
                            <h3 className="mb-3 font-medium">Manage My Account</h3>
                            <ul className="text-sm text-gray-500 pl-5">
                                <li>My Profile</li>
                                <li>Address Book</li>
                                <li>My Payment Options</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="mb-3 font-medium">My Orders</h3>
                            <ul className="text-sm text-gray-500 pl-5">
                                <li>My Returns</li>
                                <li>Address Book</li>
                                <li>My Cancellations</li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="mb-3 font-medium">My WishList</h3>
                        </li>
                    </ul>
                </aside>
                <div className="col-span-12 md:col-span-9 p-5 lg:p-8 shadow-md rounded-md">
                    <button onClick={() => setShowAside(true)}>
                        <FaBars size={25} />
                    </button>
                    <h3 className="text-red-500 font-medium my-4">Edit Your Profile</h3>
                    <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
                            <div>
                                <label htmlFor="first_name">First Name</label>
                                <input className="block rounded-sm bg-neutral-100 border-none text-md w-full mt-1"
                                    type="text" id="first_name" placeholder="Enter First Name"
                                    {...register("firstName")} />
                                {errors.firstName && <InputErrorMessage msg={errors.firstName.message} />}
                            </div>
                            <div>
                                <label htmlFor="last_name">Last Name</label>
                                <input className="block rounded-sm bg-neutral-100 border-none text-md w-full mt-1"
                                    type="text" id="last_name" placeholder="Enter Last Name"
                                    {...register("lastName")} />
                                {errors.lastName && <InputErrorMessage msg={errors.lastName.message} />}

                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
                            <div>
                                <label htmlFor="email">Email</label>
                                <input className="block rounded-sm bg-neutral-100 border-none text-md w-full mt-1 read-only:opacity-50"
                                    type="email" id="email" placeholder="Enter Email"
                                    {...register("email")} readOnly />
                                {errors.email && <InputErrorMessage msg={errors.email.message} />}
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <input className="block rounded-sm bg-neutral-100 border-none text-md w-full mt-1"
                                    type="text" id="address" placeholder="Enter Address"
                                    {...register("address")} />
                                {errors.address && <InputErrorMessage msg={errors.address.message} />}
                            </div>
                        </div>
                        <div className="password">
                            <div>
                                <label htmlFor="password">Password Changes</label>
                                <div>
                                    <input className="block rounded-sm bg-neutral-100 border-none text-md w-full mt-1"
                                        type="password" id="password" placeholder="Current Password"
                                        {...register("currentPassword")} />
                                    {errors.currentPassword && <InputErrorMessage msg={errors.currentPassword.message} />}
                                </div>
                                <div>
                                    <input className="block rounded-sm bg-neutral-100 border-none text-md w-full mt-3"
                                        type="password" placeholder="New Password"
                                        {...register("newPassword")} />
                                    {errors.newPassword && <InputErrorMessage msg={errors.newPassword.message} />}
                                </div>
                                <div>
                                    <input className="block rounded-sm bg-neutral-100 border-none text-md w-full mt-3"
                                        type="password" placeholder="Confirm New Password"
                                        {...register("confirmPassword")} />
                                    {errors.confirmPassword && <InputErrorMessage msg={errors.confirmPassword.message} />}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <button>Cancle</button>
                            <Button isLoading={isLoading}>Save Changes</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile