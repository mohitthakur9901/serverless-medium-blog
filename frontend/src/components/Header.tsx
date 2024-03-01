import { FaMedium } from "react-icons/fa6";
import { Link } from "react-router-dom";



const Header = () => {
  return (
    <div className='flex justify-around p-3  border-b-2 border-black gap-10'>
        <h1 className='text-5xl flex items-center gap-2'>
            <FaMedium/>
            <Link to="/" ><h1 className='text-4xl font-semibold'>Medium</h1></Link>
           
        </h1>
        <div className="flex justify-between gap-5 items-center">
            <Link to="/create/blog" ><h1>Write</h1></Link>
            <Link to='signin' ><h1>Sign In</h1></Link>
            <Link  to="/signup" className='rounded-3xl bg-black text-white p-2 px-5 hover:bg-gray-700'>Get Started</Link>
        </div>
    </div>
  )
}

export default Header