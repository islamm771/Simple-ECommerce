import PathElement from "../components/PathElement"
import Button from "../components/ui/button"

const PageNotFound = () => {
    return (
        <div className="container">
            <PathElement indexPath="404 Error" />
            <div className="flex flex-col items-center justify-center gap-5 py-20">
                <h1 className="text-7xl font-bold mb-3">404 Not Found</h1>
                <p className="text-sm mb-12">Your visited page not found. You may go home page.</p>
                <Button width="w-fit" onClick={() => window.location.replace("/")}>Back to home page</Button>
            </div>
        </div>
    )
}

export default PageNotFound