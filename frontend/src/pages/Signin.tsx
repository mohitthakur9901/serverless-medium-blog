import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Quote from './Quote'
import Labelinput from '../components/Labelinput'
import { SigninType } from 'mohit_mohit'

const Signin = () => {
    const [postInputs, setPostinputs] = useState<SigninType>({
        email: '',
        password: ''
    })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
            <div className="signin p-5 rounded-md items-center md:flex md:flex-col md:items-center mt-18 sm:mt-32">
                <form method="post" className='flex flex-col gap-y-5 mt-20 md:mt-28  md:w-96'>
                    <h1 className='text-2xl md:text-4xl text-center font-bold'>Login To Account</h1>
                    <div className="text-center mt-2 md:mt-4">
                        <p>Don't have an account?<Link to='/signup' className='text-blue-500 hover:underline'>Sign up</Link></p>
                    </div>
                    <Labelinput type='text' label='Email' placeholder='Email' onChange={(e) => setPostinputs({ ...postInputs, email: e.target.value })} />
                    <Labelinput type='password' label='Password' placeholder='Password' onChange={(e) => setPostinputs({ ...postInputs, password: e.target.value })} />
                    <button className="bg-black text-white p-2 rounded-md" onClick={() => handleSubmit}>Sign In</button>
                </form>
            </div>
            <Quote heading='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae commodi assumenda minima rem repellat sapiente reprehenderit. Nemo, expedita. Beatae deleniti id excepturi veniam asperiores enim? Quos officia quam maxime nihil.'
                paragraph='Jane Mills' name='CEO , Amcne Inc' />
        </div>


    )
}

export default Signin