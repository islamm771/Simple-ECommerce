
"use client";

import { Label, Table, TextInput } from "flowbite-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "../../app/features/CategoriesSlice";
import Modal from "../../components/Modal";
import { ICategory } from "../../interface";

const Categories = () => {
    const [category, setCategory] = useState({
        id: 0,
        name: "",
    })
    const { data } = useGetAllCategoriesQuery()
    const [addCategory, { isSuccess: isAddingSuccess }] = useAddCategoryMutation();
    const [editCategory, { isSuccess: isEdittingSuccess }] = useUpdateCategoryMutation()
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategory(prev => ({ ...prev, [name]: value }));
    }

    const handleAddSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            addCategory({ name: category.name })
        } catch (error) {
            console.log(error)
        }
    }
    const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            editCategory({ id: category.id, name: category.name })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isAddingSuccess) {
            toast.success('Category is added successfully', {
                position: "top-right",
                duration: 2000
            })
            setAddModalOpen(false);
        }
        if (isEdittingSuccess) {
            toast.success('Category is editted successfully', {
                position: "top-right",
                duration: 2000
            })
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
                Add Category
            </button>
            {data?.length ? (<>
                <div className="max-h-[38rem] lg:max-h-[36rem] overflow-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Action</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data.map((category: ICategory) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={category.id}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {category.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button className="font-medium text-cyan-600 dark:text-cyan-500"
                                            onClick={() => {
                                                setCategory(category)
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
                <Modal title={`Add Category`} isOpen={addModalOpen} onModalClose={setAddModalOpen}>
                    <form className="flex flex-col gap-4" onSubmit={handleAddSubmit}>
                        <div className="space-y-3">
                            <Label htmlFor="name" value="Category name" />
                            <TextInput id="name" name="name"
                                value={category.name}
                                onChange={handleInputChange}
                                placeholder="Enter category name"
                                required />
                        </div>
                        <div className="flex justify-end gap-2 mt-8">
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">Save</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                setCategory({ id: 0, name: "" });
                                setAddModalOpen(prev => !prev);
                            }}>Cancel</button>
                        </div>
                    </form>
                </Modal>
                <Modal title={`Edit Category`} isOpen={editModalOpen} onModalClose={setEditModalOpen}>
                    <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
                        <div className="space-y-3">
                            <Label htmlFor="name" value="Category name" />
                            <TextInput id="name" name="name"
                                value={category.name}
                                onChange={handleInputChange}
                                placeholder="Enter category name"
                                required />
                        </div>
                        <div className="flex justify-end gap-2 mt-8">
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">Save</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => {
                                setCategory({ id: 0, name: "" });
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



export default Categories;