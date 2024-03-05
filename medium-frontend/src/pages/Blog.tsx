import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'



const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    console.log(blogs);

    useEffect(() => {
        const fetch = async () => {
            const response = await BACKEND_URL.get('/all');
            setBlogs(response.data.blogs);
        };
        fetch();
    }, [])



    return (
        <div className='mt-32 px-4 max-w-screen-md mx-auto'>
    <h1 className='text-center text-4xl font-bold mb-8'>Blogs</h1>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {blogs ? (
            blogs.map((blog: any) => (
                <div key={blog._id} className='bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'>
                    <h1 className='text-2xl font-bold mb-4'>{blog.title}</h1>
                    <p className='text-gray-600 mb-4'>{blog.content}</p>
                    <p className='text-gray-600'>Author: {blog.author.name}</p>
                </div>
            ))
        ) : (
            <h1 className='text-center text-black'>Loading...</h1>
        )}
    </div>
</div>

    )
}

export default Blog


