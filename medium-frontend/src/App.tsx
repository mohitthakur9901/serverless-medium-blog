import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Signin from "./pages/SignIn"
import Signup from "./pages/Signup"

function App() {
  

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/create/blog" element={<h1>Contact</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
