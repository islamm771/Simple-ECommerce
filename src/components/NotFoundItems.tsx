interface IProps {
    msg: string
}

const NotFoundItems = ({ msg }: IProps) => {

    return <p className="text-2xl py-8 text-center">{msg}</p>
}


export default NotFoundItems