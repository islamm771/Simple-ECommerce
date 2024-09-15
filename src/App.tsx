import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"


const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App