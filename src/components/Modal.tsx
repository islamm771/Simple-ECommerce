import { Modal as FlowModal } from "flowbite-react"
import { ReactNode } from "react"


interface IProps {
    isOpen: boolean
    onModalClose: (val: boolean) => void
    title: string
    children: ReactNode
}


const Modal = ({ title, isOpen, onModalClose, children }: IProps) => {
    return (
        <FlowModal show={isOpen} onClose={() => onModalClose(false)}>
            <FlowModal.Header>{title}</FlowModal.Header>
            <FlowModal.Body>
                {children}
            </FlowModal.Body>
        </FlowModal>
    )
}

export default Modal