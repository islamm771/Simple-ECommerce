import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../components/ui/input"
import Button from "../components/ui/button"
import { axiosInstance } from "../config/axios.config"
import InputErrorMessage from "../components/InputErrorMessage"
import { registerSchema } from "../validation"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { IAxiosError } from "../interface"

interface IFormInput {
    username: string,
    email: string,
    password: string
}


const Register = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) })
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
        }
    }
    return (
        <form className="max-w-md mx-auto space-y-4 my-12" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-[20px] font-semibold text-center mb-6">Sign up to get acess</h2>
            <div>
                <Input {...register("username")} placeholder="Enter Username" type="text" />
                {errors?.username && <InputErrorMessage msg={errors.username.message} />}
            </div>
            <div>
                <Input {...register("email")} placeholder="Enter Email" type="email" />
                {errors?.email && <InputErrorMessage msg={errors.email.message} />}
            </div>
            <div>
                <Input {...register("password")} placeholder="Enter Password" type="password" />
                {errors?.password && <InputErrorMessage msg={errors.password.message} />}
            </div>

            <Button>Sign up</Button>
        </form>
    )
}

export default Register