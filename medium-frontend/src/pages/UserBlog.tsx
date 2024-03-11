
import { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { IoTrashBinOutline } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import toast from 'react-hot-toast';

const UserBlog = () => {

    const { blog } = useSelector((state: any) => state.blog);
    const { user, token } = useSelector((state: any) => state.user)
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const deleteblog = async () => {

        try {
            setLoading(true)
            const res = await BACKEND_URL.delete(`/blog/${user.id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (res.status === 200) {
                setLoading(false)
                toast.success('Blog deleted successfully');
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Failed to delete blog');
        }
    };

    return (
        <div className='mt-32 max-w-screen-md mx-auto'>
            {loading ? (
                <ul className='blog-list'>
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
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
                    <li key={blog.id} className='blog-item rounded-md'>
                        <div className='flex  justify-end gap-5'>
                            <button
                                type='button'
                                className='px-6 h-8 bg-red-600 text-white rounded-lg hover:bg-red-500'
                                onClick={deleteblog}
                            >
                                <IoTrashBinOutline />
                            </button>
                            <button
                                type='button'
                                className='px-6 h-8 bg-green-500 text-white rounded-lg hover:bg-green-400'
                                onClick={() => navigate(`/update/${user.id}`)}
                            >
                                <CiEdit />
                            </button>
                        </div>
                        <h1 className='text-2xl font-bold mb-4'>{blog.title}</h1>
                        <p className='text-gray-600 mb-4'>{blog.content}</p>
                        <div className='flex justify-end'>
                            <Link to={`/`}>
                                <button
                                    type='button'
                                    className='px-6 h-8 bg-black text-white rounded-lg hover:bg-gray-900'
                                >
                                    Go back
                                </button>
                            </Link>

                        </div>
                    </li>
                </ul>
            )}

        </div>
    )
}

export default UserBlog