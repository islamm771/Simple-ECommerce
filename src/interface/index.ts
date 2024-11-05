export interface ILoginForm {
    name: "email" | "password",
    type: string,
    placeholder: string,
}

export interface IAxiosError {
    error: {
        details: {},
        message: string,
        name: string,
        status: number
    }
}

export interface IProduct {
    id: number,
    title: string,
    image: string
    quantity: number | 0,
    description: string,
    price: number,
    category: string,
    count: number,
    rate: 0
}


export interface IAddProduct {
    title: string,
    price: number,
    description: string,
    category: string,
    count: number
}

export interface IProductForm {
    name: "title" | "description" | "price" | "count",
    type: string,
    placeholder: string,
}

export interface ICategory {
    id: number,
    name: string,
}


export interface IUser {
    id: number;
    username: string
    email: string,
    password: string,
    gender: string,
    firstName: string,
    lastName: string,
    image: string,
    address: string,
    // orders: IOrder[]
}



export interface IProfileForm {
    firstName: string;
    lastName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    address: string;
}