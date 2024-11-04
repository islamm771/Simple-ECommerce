import { ReactNode } from "react"

interface IProps {
    children: ReactNode,
    title: string,
    classes?: string
}

const Wrapper = ({ children, title, classes = "py-8" }: IProps) => {

    return <div className={`container ${classes}`}>
        <h5 className="text-sm font-semibold relative pl-6 text-red-600 before:content-[''] before:absolute before:-top-1 before:left-0 before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
            {title}
        </h5>
        {children}
    </div>
}


export default Wrapper