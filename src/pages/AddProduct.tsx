import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../components/ui/input"
import { PRODUCT_FORM } from "../data"
import InputErrorMessage from "../components/InputErrorMessage"
import Button from "../components/ui/button"
import { axiosInstance } from "../config/axios.config"
import TextBox from "../components/ui/textBox"
import toast from "react-hot-toast"

interface IFormInput {
    title: string,
    price: number,
    description: string,
    category: string,
    rate: number,
    count: number
}


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const formData = {
            title: data.title,
            price: Number(data.price),
            description: data.description,
            category: data.category,
            rating: {
                rate: Number(data.rate),
                count: Number(data.count),
            }
        }
        try {
            const { status } = await axiosInstance.post("/products", formData)
            if (status === 201) {
                toast.success("Product is added successfully", {
                    position: "top-right",
                    duration: 2000
                })
                reset();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const renderProductForm = PRODUCT_FORM.map((input, idx) => (
        <div key={idx}>

            {input.name === "description" ? <TextBox {...register(input.name)} placeholder={input.placeholder} /> :
                <Input {...register(input.name)} placeholder={input.placeholder} type={input.type} />
            }

            {errors[input.name] && <InputErrorMessage msg={errors[input.name]?.message} />}
        </div>
    ))
    return (
        <div className="container my-12">
            <h2 className="text-[25px] font-semibold text-center mb-6">Add a new product</h2>

            <form action="" className="max-w-xl mx-auto space-y-3" onSubmit={handleSubmit(onSubmit)}>
                {renderProductForm}

                <Button>Add Product</Button>
            </form>
        </div>
    )
}

export default AddProduct



