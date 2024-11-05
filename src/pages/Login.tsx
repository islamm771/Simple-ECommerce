import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../components/ui/input"
import Button from "../components/ui/button"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../validation"
import InputErrorMessage from "../components/InputErrorMessage"
import { axiosInstance } from "../config/axios.config"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { IAxiosError } from "../interface"
import { LOGIN_FORM } from "../data"
import { useState } from "react"
import { Link } from "react-router-dom"


interface IFormInput {
    email: string
    password: string
}

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) })
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true)
        try {
            const { status, data: userData } = await axiosInstance.post("/login", data)
            if (status === 200) {
                toast.success('You will be navigated to home page in 2 sec', {
                    position: "bottom-center",
                    duration: 1500
                })
                localStorage.setItem("userData", JSON.stringify(userData))
                setTimeout(() => {
                    location.replace("/")
                }, 1000)
            }
        } catch (error) {
            const objectError = error as AxiosError<IAxiosError>
            toast.error(`${objectError.response?.data.error}`, {
                position: "bottom-center",
                duration: 2000
            })
        }
        finally {
            setIsLoading(false)
        }
    }


    const renderLoginForm = LOGIN_FORM.map((input, idx) => (
        <div key={idx}>
            <Input {...register(input.name)} placeholder={input.placeholder} type={input.type} />
            {errors[input.name] && <InputErrorMessage msg={errors[input.name]?.message} />}
        </div>
    ))

    return (
        <div className="flex">
            <div className="hidden md:block">
                <img className="w-[600px]" src="/imgs/side-img.png" alt="" />
            </div>
            <div className="flex-1 flex justify-center py-28 px-12">
                <form className="w-full md:w-[400px] space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="!mb-8">
                        <h2 className="text-[20px] font-semibold mb-2">Log in to Exclusive</h2>
                        <p className="">Enter your details below</p>
                    </div>
                    {renderLoginForm}

                    <Button width="w-full" isLoading={isLoading}>Login</Button>
                    <p className="text-center text-gray-600">Don't have an account ? <Link className="text-gray-800 font-medium border-b-2 border-gray-600" to="/register">Sign up</Link></p>

                </form>
            </div>
        </div>
    )
}

export default Login



