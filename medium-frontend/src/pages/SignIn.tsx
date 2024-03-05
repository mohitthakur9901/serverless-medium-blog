import { Link, useNavigate } from "react-router-dom";
import Labelinput from "../components/Labelinput";
import Quote from "../components/Quote";
import { useState } from "react";
import axios from "axios";
import { SigninType } from "mohit_mohit";
import { BACKEND_URL } from "../config";

const Signin = () => {
    const navigate = useNavigate();
    const [postInputs, setPostinputs] = useState<SigninType>({
        email: '',
        password: ''
    });
    const [responseData, setResponseData] = useState();
    console.log(responseData);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}api/v1/signin`, postInputs);
            console.log(response);

            if (response.status === 200) {
                setResponseData(response.data);
                navigate('/');
                setPostinputs({ email: '', password: '' });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
            setPostinputs({ email: '', password: '' });
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
            <div className="signin p-5 rounded-md items-center md:flex md:flex-col md:items-center mt-18 sm:mt-2">
                <form method="post" className='flex flex-col gap-y-5 mt-20 md:mt-28 md:w-96'>
                    <h1 className='text-4xl text-center font-bold mb-4 md:text-5xl mt-20'>Login To Account</h1>
                    <div className="text-center mt-2 md:mt-4">
                        <p>Don't have an account?<Link to='/signup' className='text-blue-500 hover:underline'> Sign up</Link></p>
                    </div>
                    <Labelinput type='text' label='Email' placeholder='Email' onChange={(e) => setPostinputs({ ...postInputs, email: e.target.value })} />
                    <Labelinput type='password' label='Password' placeholder='Password' onChange={(e) => setPostinputs({ ...postInputs, password: e.target.value })} />
                    <button className="bg-black text-white p-2 rounded-md" onClick={() => handleSubmit}>Sign In</button>
                </form>
            </div>
            <Quote heading='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae commodi assumenda minima rem repellat sapiente reprehenderit. Nemo, expedita. Beatae deleniti id excepturi veniam asperiores enim? Quos officia quam maxime nihil.'
                paragraph='Jane Mills' name='CEO , Amcne Inc' />
        </div>
    );
};

export default Signin;
