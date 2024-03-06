import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Signin from "./pages/SignIn"
import Signup from "./pages/Signup"
import Blog from "./pages/Blog"
import CreateBlog from "./pages/CreateBlog"
import BLogCard from "./components/BLogCard"
import PrivateRoute from "./components/PrivateRoute"
import UpdateBlog from "./pages/UpdateBlog"

function App() {
  
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Blog/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route element={<PrivateRoute/>} >
        <Route path="/create/blog" element={<CreateBlog/>} />
        <Route path="/blog/:id" element={<BLogCard/>} />
        <Route path="/update/:id" element={<UpdateBlog/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
