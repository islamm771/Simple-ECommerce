interface IProps {
    pathes?: string
    indexPath: string;
}

const PathElement = ({ pathes, indexPath }: IProps) => {

    return (
        <p className="text-gray-400 my-8">
            Home / {pathes} <span className="text-black capitalize">{indexPath}</span>
        </p>
    )

}


export default PathElement