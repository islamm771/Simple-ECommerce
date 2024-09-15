import { forwardRef, Ref, TextareaHTMLAttributes } from "react"

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextBox = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
        <textarea
            className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent resize-none"
            rows={5}
            {...rest}
            ref={ref}
        />
    )
})

export default TextBox