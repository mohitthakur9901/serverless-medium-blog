import { useState } from 'react';
import { Link } from 'react-router-dom';
import Quote from './Quote';
import Labelinput from '../components/Labelinput';
import { SignupType } from 'mohit_mohit';
import { BACKEND_URL } from '../config';


const Signup = () => {
    const [postInputs, setPostinputs] = useState<SignupType>({
        name: '',
        email: '',
        password: '',
    });

    async function handleSubmit() {
        try {
            const response = await fetch(`${BACKEND_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postInputs),
            });
            const data = await response.json();
            console.log(data);
            if (data.message === 'User created successfully') {
                alert('User created successfully');
            } else {
                alert('User already exists');
            }
            setPostinputs({ name: '', email: '', password: '' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="signin p-5 rounded-md items-center md:flex md:flex-col md:items-center md:justify-center">
                <form method="post" className="flex flex-col gap-y-5 md:w-96">
                    <h1 className="text-4xl text-center font-bold mb-4 md:text-5xl">Create An Account</h1>
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
                        label="Username"
                        placeholder="UserName"
                        onChange={(e) => {
                            setPostinputs({ ...postInputs, name: e.target.value });
                        }}
                    />
                    <Labelinput
                        type="text"
                        label="Email"
                        placeholder="Email"
                        onChange={(e) => {
                            setPostinputs({ ...postInputs, email: e.target.value });
                        }}
                    />
                    <Labelinput
                        type="password"
                        label="Password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPostinputs({ ...postInputs, password: e.target.value });
                        }}
                    />
                    <button className="bg-black text-white p-2 rounded-md" onClick={handleSubmit}>
                        Sign up
                    </button>
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
