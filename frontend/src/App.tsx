import Header from "./components/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Blog from "./pages/Blog"
import CreateBlog from "./pages/CreateBlog"
function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Blog/>} />
        <Route path="/create/blog" element={<CreateBlog/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
