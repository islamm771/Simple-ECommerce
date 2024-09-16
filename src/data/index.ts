import { ILoginForm, IProductForm } from "../interface";

export const LOGIN_FORM: ILoginForm[] = [
    {
        name: "email",
        type: "text",
        placeholder: "Enter Email"
    },
    {
        name: "password",
        type: "password",
        placeholder: "Enter Password"
    }
]


export const PRODUCT_FORM: IProductForm[] = [
    {
        name: "title",
        placeholder: "Enter Product Name",
        type: "text"
    },
    {
        name: "description",
        placeholder: "Enter Product Description",
        type: "text"
    },
    {
        name: "price",
        placeholder: "Enter Product Price",
        type: "number"
    },
    {
        name: "category",
        placeholder: "Enter Product Category",
        type: "text"
    },
    {
        name: "rate",
        placeholder: "Enter Product Rating",
        type: "number"
    },
    {
        name: "count",
        placeholder: "Enter Product Count",
        type: "number"
    },
]



export const getUserData = () => {
    const userDataString = localStorage.getItem("userData")
    const userData = userDataString ? JSON.parse(userDataString) : null

    return userData
}