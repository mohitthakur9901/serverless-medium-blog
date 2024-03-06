import { Link, useNavigate } from "react-router-dom";
import Labelinput from "../components/Labelinput";
import Quote from "../components/Quote";
import { useState } from "react";

import { SigninType } from "mohit_mohit";
import { BACKEND_URL } from "../config";
import { useDispatch } from "react-redux";
import { setUser } from '../store/AuthUser/User'
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Signin = () => {
    const navigate = useNavigate();
    const [Loading, setLoading] = useState<boolean>(false);

    const [postInputs, setPostinputs] = useState<SigninType>({
        email: '',
        password: ''
    });
    // console.log(postInputs);

    const dispatch = useDispatch();


    const handleSubmit = async () => {
        if (postInputs.email === '' || postInputs.password === '') {
            toast.error('Please fill in all the fields');
            return;
        }
        try {
            setLoading(true)
            const response = await BACKEND_URL.post(`/signin`, postInputs);
            if (response.status === 200) {
                dispatch(setUser(response.data))
                toast.success('Login Successful');
                setLoading(false)
                navigate('/');
                setPostinputs({ email: '', password: '' });
            }
            setPostinputs({ email: '', password: '' });
        } catch (error) {
            console.error(error);
            toast.error('Invalid credentials');
            setPostinputs({ email: '', password: '' });
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
            <div className="signin p-5 rounded-md items-center md:flex md:flex-col md:items-center mt-18 sm:mt--0">
                <form method="post" className='flex flex-col gap-y-5 mt-20 md:mt-28 md:w-96'>
                    <h1 className='text-4xl text-center font-bold mb-4 md:text-5xl mt-20'>Login To Account</h1>
                    <div className="text-center mt-2 md:mt-4">
                        <p>Don't have an account?<Link to='/signup' className='text-blue-500 hover:underline'> Sign up</Link></p>
                    </div>
                    <Labelinput type='text' label='Email' placeholder='Email' className='border-2 border-black rounded-md p-2' onChange={(e) => setPostinputs({ ...postInputs, email: e.target.value.trim() })} />
                    <Labelinput type='password' label='Password' placeholder='Password' className='border-2 border-black rounded-md p-2' onChange={(e) => setPostinputs({ ...postInputs, password: e.target.value.trim() })} />
                    <button type="button" className={`bg-black text-white p-2 rounded-md ${Loading ? "opacity-50" : ""} `} onClick={handleSubmit} disabled={Loading}>
                        <button
                        type="button"
                        className={`bg-black text-white p-2 rounded-md ${Loading ? "opacity-50" : ""}`}
                        onClick={handleSubmit}
                        disabled={Loading}
                    >
                        {Loading ? <h1 className="animate-spin text-white items-center"><AiOutlineLoading3Quarters /></h1> : 'Sign In'}
                    </button></button>
                </form>
            </div>
            <Quote heading='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae commodi assumenda minima rem repellat sapiente reprehenderit. Nemo, expedita. Beatae deleniti id excepturi veniam asperiores enim? Quos officia quam maxime nihil.'
                paragraph='Jane Mills' name='CEO , Amcne Inc' />
        </div>
    );
};

export default Signin;
