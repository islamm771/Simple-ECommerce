import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    isLoading?: boolean,
    centered?: boolean,
    width: "w-fit" | "w-full"
}

const Button = ({ width = "w-fit", children, centered, isLoading, ...rest }: IProps) => {
    return (
        <button
            className={`bg-[#DB4444] ${width} px-4 py-[14px] text-sm flex items-center justify-center ${centered ? 'mx-auto' : ''} rounded-[4px] font-medium text-white duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isLoading}
            {...rest}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    )
}

export default Button