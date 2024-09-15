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
            toast.error(`${objectError.response?.data}`, {
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
        <form className="max-w-md mx-auto space-y-4 my-12" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-[20px] font-semibold text-center mb-4">Login to get acess</h2>
            {renderLoginForm}

            <Button isLoading={isLoading}>Login</Button>
        </form>
    )
}

export default Login



