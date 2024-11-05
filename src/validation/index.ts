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
        gender: yup.string().required("Gender is required"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    })
    .required()


// Define the validation schema using Yup
export const profileSchema = yup.object({
    firstName: yup.string()
        .required("First Name is required")
        .min(4, "First Name must be at least 4 characters"),
    lastName: yup.string()
        .required("Last Name is required")
        .min(4, "Last Name must be at least 4 characters"),
    address: yup.string()
        .required("Address is required")
        .min(4, "Address must be at least 4 characters"),
    email: yup.string()
        .required("Email is required")
        .email("Not a valid email address"), // You can use the built-in email method for better validation
    currentPassword: yup.string()
        .required("Current Password is required")
        .min(6, "Current Password must be at least 6 characters"),
    newPassword: yup.string()
        .required("New Password is required")
        .min(6, "New Password must be at least 6 characters"),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref('newPassword')], "Passwords must match"), // Ensure confirmPassword matches newPassword
    // image: yup.mixed().notRequired(),
}).required();





