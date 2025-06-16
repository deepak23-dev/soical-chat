import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/home/Home"
import Profile from "./components/user/Profile"

function App() {
const router=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/profile",
    element:<Profile/>
  }
])

  return <RouterProvider router={router} />
}

export default App
