
"use client";
import { SubmitHandler, useForm } from "react-hook-form"
import { FileInput, Label, Select, Table, Textarea, TextInput } from "flowbite-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from "../../app/features/ProductsSlice";
import Modal from "../../components/Modal";
import { PRODUCT_FORM } from "../../data";
import { IAddProduct, IProduct } from "../../interface";
import { axiosInstance } from "../../config/axios.config";
import InputErrorMessage from "../../components/InputErrorMessage";
import { useGetAllCategoriesQuery } from "../../app/features/CategoriesSlice";


const Products = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IAddProduct>()
    const [productToEdit, setProductToEdit] = useState({
        id: 0,
        title: "",
        image: "",
        description: "",
        category: "",
        price: 0,
        count: 0,
    })
    const { data } = useGetAllProductsQuery();
    const [addProduct, { isSuccess: isAddingSuccess }] = useAddProductMutation();
    const [editProduct, { isSuccess: isEdittingSuccess }] = useUpdateProductMutation();

    const { data: categories } = useGetAllCategoriesQuery()
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductToEdit(prev => ({ ...prev, [name]: value }));
    }
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductToEdit(prev => ({ ...prev, [name]: value }));
    }
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
                setImageUrl('');
            }
        }
    }

    const renderProductForm = PRODUCT_FORM.map((input, idx) => (
        <div key={idx}>
            {input.name === "description" ?
                <Textarea
                    {...register(input.name, { required: `${input.name} is required` })}
                    placeholder={input.placeholder}
                    rows={5} /> :
                <TextInput
                    type={input.type}
                    {...register(input.name, { required: `${input.name} is required` })}
                    placeholder={input.placeholder} />
            }
            {errors[input.name] && <InputErrorMessage msg={errors[input.name]?.message} />}
        </div>
    ))

    const onSubmit: SubmitHandler<IAddProduct> = (data) => {
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
            addProduct(formData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            title: productToEdit.title,
            price: Number(productToEdit.price),
            description: productToEdit.description,
            image: imageUrl || productToEdit.image,
            category: productToEdit.category,
            count: Number(productToEdit.count),
            rate: 0
        }
        console.log(formData)
        try {
            editProduct({ id: productToEdit.id, product: formData })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isAddingSuccess) {
            toast.success('Product is added successfully', {
                position: "top-right",
                duration: 2000
            })
            reset();
            setImageUrl('');
            setAddModalOpen(false);
        }
        if (isEdittingSuccess) {
            toast.success('Product is editted successfully', {
                position: "top-right",
                duration: 2000
            })
            setImageUrl('');
            setEditModalOpen(false);
        }
    }, [isAddingSuccess, isEdittingSuccess]);
    return (
        <>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 mb-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 block ml-auto dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button"
                onClick={() => setAddModalOpen(prev => !prev)}
            >
                Add Product
            </button>

            {data?.length ? (<>
                <div className="max-h-[38rem] lg:max-h-[36rem] overflow-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Product name</Table.HeadCell>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Count</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Action</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data.map((product: IProduct) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={product.id}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <img className="w-12 h-12 rounded-full" src={product.image} alt={product.title} />
                                    </Table.Cell>
                                    <Table.Cell>{product.category}</Table.Cell>
                                    <Table.Cell>${product.price}</Table.Cell>
                                    <Table.Cell>{product.count}</Table.Cell>
                                    <Table.Cell>
                                        <button className="font-medium text-cyan-600 dark:text-cyan-500"
                                            onClick={() => {
                                                setProductToEdit(product)
                                                setEditModalOpen(prev => !prev);
                                            }}>
                                            Edit
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                <Modal title={`Add Product`} isOpen={addModalOpen} onModalClose={setAddModalOpen}>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        {renderProductForm}
                        <div>
                            <Select {...register("category")}>
                                <option value="" disabled>Select Category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))
                                }
                            </Select>
                        </div>
                        <div>
                            <FileInput id="file-upload" accept="image/*" onChange={handleFileChange} />
                        </div>
                        <div className="flex justify-end gap-2 mt-8">
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">Add</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                setAddModalOpen(prev => !prev);
                            }}>Cancel</button>
                        </div>
                    </form>
                </Modal>
                <Modal title={`Edit Product - ${productToEdit?.title}`} isOpen={editModalOpen} onModalClose={setEditModalOpen}>
                    <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                        <div className="space-y-3">
                            <Label htmlFor="title" value="Title" />
                            <TextInput id="title" name="title"
                                value={productToEdit.title}
                                onChange={handleInputChange}
                                placeholder="Enter product title"
                                required />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="description" value="Description" />
                            <Textarea id="description" name="description" rows={5}
                                value={productToEdit.description}
                                onChange={handleInputChange}
                                placeholder="Enter product description"
                                required />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="price" value="Price" />
                            <TextInput id="price" name="price"
                                value={productToEdit.price}
                                onChange={handleInputChange}
                                placeholder="Enter product title"
                                required />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="categories" value="Category" />
                            <Select id="categories" name="category"
                                defaultValue={productToEdit.category}
                                onChange={handleSelectChange}>
                                <option value="" disabled>Select Category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))
                                }
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="product-img" value="Image" />
                            <FileInput id="product-img" accept="image/*" onChange={handleFileChange} />
                        </div>
                        <div className="flex justify-end gap-2 mt-8">
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">Save</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                setEditModalOpen(prev => !prev);
                            }}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            </>
            ) : (
                <div>
                    No products yet!!
                </div>
            )}

        </>
    );
}



export default Products;