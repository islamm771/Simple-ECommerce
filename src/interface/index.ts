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
    quantity: number | 0,
    description: string,
    price: number,
    category: string,
    rating: {
        rate: number,
        count: number
    }
}

