import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='flex justify-center mt-32'>
            <div className="rounded-lg shadow-2xl h-[50vh] w-[25vw] p-8 bg-white">
                <h1 className='text-center text-2xl'>Sign Up </h1>
                <form method="post" className='grid grid-cols-1 gap-y-5 mt-5'>
                    <input type="text" placeholder='name' className='mb-4 p-2 border border-gray-300 rounded-md' />
                    <input type="text" placeholder='email' className='mb-4 p-2 border border-gray-300 rounded-md' />
                    <input type="text" placeholder='password' className='mb-4 p-2 border border-gray-300 rounded-md' />
                    <button className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400'>Sign Up</button>
                </form>
                <div className='flex justify-center mt-5'>
                    <Link to='/signin' className='text-blue-500'>Already have an account?</Link>
                </div>

            </div>
        </div>

    )
}

export default Signup