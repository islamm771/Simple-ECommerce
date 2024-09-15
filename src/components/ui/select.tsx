import { forwardRef, ReactNode, Ref, SelectHTMLAttributes } from "react"

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
}

const Select = forwardRef(({ children, ...rest }: IProps, ref: Ref<HTMLSelectElement>) => {
    return (
        <select
            className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
            {...rest}
            ref={ref}
        >
            {children}
        </select>
    )
})

export default Select