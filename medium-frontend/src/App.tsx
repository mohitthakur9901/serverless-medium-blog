import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Signin from "./pages/SignIn"
import Signup from "./pages/Signup"
import Blog from "./pages/Blog"
import CreateBlog from "./pages/CreateBlog"

function App() {
  

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Blog/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/create/blog" element={<CreateBlog/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
