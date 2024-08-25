import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface IProps {
    isAllowed: boolean,
    children: ReactNode,
    path: string,
}


const ProtectedRoute = ({ isAllowed, children, path }: IProps) => {
    if (!isAllowed) {
        return <Navigate to={path} />
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute