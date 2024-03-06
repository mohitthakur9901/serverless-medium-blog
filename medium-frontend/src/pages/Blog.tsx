import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const { token } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BACKEND_URL.get('/all');
        console.log(response.data.blogs);
        
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className='mt-32 max-w-screen-md mx-auto'>
      {loading ? (
        <ul className='blog-list'>
          {[1, 2, 3,4,5,6].map((_, index) => (
            <li key={index} className='blog-item'>
              <Skeleton height={20} width='80%' />
              <Skeleton height={30} width='100%' />
              <Skeleton height={100} width='100%' />
              <Skeleton height={30} width='50%' />
              <Skeleton height={30} width='50%' />
              <Skeleton height={30} width='50%' />
            </li>
          ))}
        </ul>
      ) : (
        <ul className='blog-list'>
          {blogs.map((blog: any) => (
            <li key={blog._id} className='blog-item rounded-md'>
              <p className='text-gray-600 mb-4 items-center flex gap-2 justify-end text-lg'>
                <FaUserCircle /> {blog.author.name}
              </p>
              <h1 className='text-2xl font-bold mb-4'>{blog.title}</h1>
              <p className='text-gray-600 mb-4'>{blog.content}</p>
              <div className='flex justify-end items-center'>
                {token ? (
                  <Link to={`/blog/${blog.id}`} key={blog._id}>
                    <button
                    key={blog._id}
                      type='button'
                      className='px-6 h-8 bg-black text-white rounded-lg hover:bg-gray-900'
                    >
                      Read More
                    </button>
                  </Link>
                ) : (
                  <button
                  key={blog._id}
                    type='button'
                    className='px-6 h-8  bg-black text-white rounded-lg hover:bg-gray-800'
                    onClick={() => navigate('/signin')}
                  >
                    Login to Read More
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blog;
