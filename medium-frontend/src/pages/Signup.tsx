import { Link, useNavigate } from "react-router-dom";
import Labelinput from "../components/Labelinput";
import Quote from "../components/Quote";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { SignupType } from "mohit_mohit";
import { setUser } from '../store/AuthUser/User'
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState<boolean>(false);

    const [postInputs, setPostinputs] = useState<SignupType>({
        name: '',
        email: '',
        password: '',
    });

    async function handleSubmit() {
        if (postInputs.name === '' || postInputs.email === '' || postInputs.password === '') {
            toast.error('Please fill in all the fields');
            return;
        }
       
        try {
            setLoading(true);
            const response = await BACKEND_URL.post(`/signup`, postInputs);
            console.log(response);

            if (response.status === 200) {

                dispatch(setUser(response.data))
                setLoading(false)
                toast.success('Signup Successful');
                navigate('/');
                setPostinputs({ name: '', email: '', password: '' });
            }
            toast.error('Invalid credentials');
            setPostinputs({ name: '', email: '', password: '' });
        } catch (error) {
            console.error(error);
            toast.error('Invalid credentials');
            setPostinputs({ email: '', password: '' });
        }
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="signin p-5 rounded-md items-center md:flex md:flex-col md:items-center md:justify-center">
                <form method="post" className="flex flex-col gap-y-5 md:w-96">
                    <h1 className="text-4xl text-center font-bold mb-4 md:text-5xl mt-20">Create An Account</h1>
                    <div className="text-center mb-4 md:text-lg">
                        <p>
                            Already have an account?
                            <Link to="/signin" className="text-blue-500 hover:underline">
                                Log In
                            </Link>
                        </p>
                    </div>
                    <Labelinput
                        type="text"
                        label="Name"
                        required={true}
                        className='border-2 border-black rounded-md p-2'
                        placeholder="Name"
                        onChange={(e) => {
                            setPostinputs({ ...postInputs, name: e.target.value });
                        }}
                    />
                    <Labelinput
                        type="text"
                        required={true}
                        label="Email"
                        placeholder="Email"
                        className='border-2 border-black rounded-md p-2'
                        onChange={(e) => {
                            setPostinputs({ ...postInputs, email: e.target.value });
                        }}
                    />
                    <Labelinput
                        type="password"
                        required={true}
                        label="Password"
                        placeholder="Password"
                        className='border-2 border-black rounded-md p-2'
                        onChange={(e) => {
                            setPostinputs({ ...postInputs, password: e.target.value });
                        }}
                    />
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
            <Quote
                heading="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae commodi assumenda minima rem repellat sapiente reprehenderit. Nemo, expedita. Beatae deleniti id excepturi veniam asperiores enim? Quos officia quam maxime nihil."
                paragraph="Jane Mills"
                name="CEO , Amcne Inc"
            />
        </div>
    );
};

export default Signup;
