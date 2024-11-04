import { forwardRef, InputHTMLAttributes, Ref } from "react"

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input
            className="border-b border-t-0 border-l-0 border-r-0 border-solid border-gray-600 focus:outline-none focus:ring-0 py-2 px-0 text-md w-full bg-white"
            {...rest}
            ref={ref}
        />
    )
})

export default Input