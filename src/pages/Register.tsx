import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../components/ui/input"
import Button from "../components/ui/button"
import { axiosInstance } from "../config/axios.config"
import InputErrorMessage from "../components/InputErrorMessage"
import { registerSchema } from "../validation"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { Link, useNavigate } from "react-router-dom"
import { IAxiosError } from "../interface"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc";


interface IFormInput {
    username: string,
    email: string,
    gender: string
    password: string
}


const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) })
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true)
        try {
            const { status } = await axiosInstance.post("/register", data)
            if (status === 200 || status === 201) {
                toast.success('You will be navigated to login page in 2 sec', {
                    position: "bottom-center",
                    duration: 1500
                })
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            }
        } catch (error) {
            const objectError = error as AxiosError<IAxiosError>
            toast.error(`${objectError.response?.data.error}`, {
                position: "bottom-center",
                duration: 2000
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex">
            <div className="hidden md:block">
                <img className="w-[600px]" src="/imgs/side-img.png" alt="" />
            </div>
            <div className="flex-1 flex justify-center py-14 px-12">
                <form className="w-full md:w-[400px] space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="!mb-8">
                        <h2 className="text-[20px] font-semibold mb-2">Create an account</h2>
                        <p className="">Enter your details below</p>
                    </div>
                    <div>
                        <Input {...register("username")} placeholder="Enter Username" type="text" />
                        {errors?.username && <InputErrorMessage msg={errors.username.message} />}
                    </div>
                    <div>
                        <Input {...register("email")} placeholder="Enter Email" type="email" />
                        {errors?.email && <InputErrorMessage msg={errors.email.message} />}
                    </div>
                    <div className="text-gray-600 space-x-4">
                        <label className="mr-2" htmlFor="">Gender:</label>
                        <label className="inline-flex items-center gap-2" htmlFor="male-option">
                            <input
                                type="radio"
                                id="male-option"
                                value="male"
                                className="focus:ring-0"
                                {...register("gender")}
                            />
                            Male
                        </label>
                        <label className="inline-flex items-center gap-2" htmlFor="female-option">
                            <input
                                type="radio"
                                id="female-option"
                                value="female"
                                className="focus:ring-0"
                                {...register("gender")}
                            />
                            Female
                        </label>

                        {errors?.gender && <InputErrorMessage msg={errors.gender.message} />}
                    </div>
                    <div>
                        <Input {...register("password")} placeholder="Enter Password" type="password" />
                        {errors?.password && <InputErrorMessage msg={errors.password.message} />}
                    </div>

                    <div>
                        <Button width="w-full" isLoading={isLoading}>Sign up</Button>
                        <button
                            className={`mt-3 border border-black w-full px-4 py-[14px] text-sm flex items-center justify-center gap-2 rounded-sm font-medium`}
                        >
                            <FcGoogle size={20} /> Sign up with Google
                        </button>
                    </div>

                    <p className="text-center text-gray-600">Already have an account? <Link className="text-gray-800 font-medium border-b-2 border-gray-600" to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register