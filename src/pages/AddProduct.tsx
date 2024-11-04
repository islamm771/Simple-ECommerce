import { ChangeEvent, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import InputErrorMessage from "../components/InputErrorMessage"
import Button from "../components/ui/button"
import Input from "../components/ui/input"
import TextBox from "../components/ui/textBox"
import { axiosInstance } from "../config/axios.config"
import { getUserData, PRODUCT_FORM } from "../data"
import { ICategory } from "../interface"

interface IFormInput {
    title: string,
    price: number,
    description: string,
    category: string,
    count: number
}


const AddProduct = () => {
    const user = getUserData();
    const [categories, setCategories] = useState<ICategory[]>([])
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>()

    const renderProductForm = PRODUCT_FORM.map((input, idx) => (
        <div key={idx}>
            {input.name === "description" ? <TextBox {...register(input.name)} placeholder={input.placeholder} /> :
                <Input {...register(input.name)} placeholder={input.placeholder} type={input.type} />
            }
            {errors[input.name] && <InputErrorMessage msg={errors[input.name]?.message} />}
        </div>
    ))

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files?.length) {
            const file = files[0]
            const formData = new FormData()
            formData.append("image", file)
            try {
                const response = await axiosInstance.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 10000, // Set timeout to 5000ms (5 seconds)
                });
                toast.success("Image uploaded successfully", {
                    position: "top-right",
                    duration: 2000
                })
                setImageUrl(response.data.imageUrl);
            } catch (error) {
                toast.error("Error uploading image", {
                    position: "top-right",
                    duration: 2000
                })
                setImageUrl(null);
            }
        }
    }


    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const formData = {
            title: data.title,
            price: Number(data.price),
            description: data.description,
            image: imageUrl,
            category: data.category,
            count: Number(data.count),
            rate: 0
        }
        console.log(formData)
        try {
            const { status } = await axiosInstance.post("/products", formData, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                    // "Content-Type": "multipart/form-data",
                }
            })
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

    const getCategories = async () => {
        try {
            const { data } = await axiosInstance.get("/categories")
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div className="container my-12">
            <h2 className="text-[25px] font-semibold text-center mb-6">Add a new product</h2>

            <form action="" className="max-w-xl mx-auto space-y-3" onSubmit={handleSubmit(onSubmit)}>
                {renderProductForm}
                <div>
                    <select {...register("category")}
                        className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent">
                        <option value="" disabled>Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))
                        }
                    </select>
                </div>
                <div>
                    <Input type="file" name="" id="" accept="image/*" onChange={handleFileChange} />
                </div>

                <Button>Add Product</Button>
            </form >
        </div >
    )
}

export default AddProduct



