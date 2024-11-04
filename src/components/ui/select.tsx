import { forwardRef, ReactNode, Ref, SelectHTMLAttributes } from "react"

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
}

const Select = forwardRef(({ children, ...rest }: IProps, ref: Ref<HTMLSelectElement>) => {
    return (
        <select
            className="border-b border-t-0 border-l-0 border-r-0 border-solid border-gray-600 py-2 px-0 text-md w-full bg-white"
            {...rest}
            ref={ref}
        >
            {children}
        </select>
    )
})

export default Select