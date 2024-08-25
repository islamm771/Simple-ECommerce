import * as yup from "yup"

export const loginSchema = yup
    .object({
        email: yup.string().required("Email is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
    })
    .required()


export const registerSchema = yup
    .object({
        username: yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
        email: yup.string().required("Email is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    })
    .required()
