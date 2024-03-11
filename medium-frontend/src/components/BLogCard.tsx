import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { setBlog } from '../store/AuthUser/BLog';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

const BLogCard = () => {
    const { id } = useParams();
    const { token, user } = useSelector((state: any) => state.user);
    const { blog } = useSelector((state: any) => state.blog);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await BACKEND_URL.get(`/blog/${id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                // console.log(res.data.blog);
                if (res.status === 200) {
                    dispatch(setBlog(res.data.blog));
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                toast.error('Failed to fetch blog');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, token, dispatch]);


    const deleteblog = async () => {

        try {
            setLoading(true)
            const res = await BACKEND_URL.delete(`/blog/${id}`, {
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
        <div className="bg-white p-8 rounded-md shadow-md mt-32">
            {loading ? (
                <>
                    <Skeleton height={20} width={200} />
                    <Skeleton height={40} width={'80%'} />
                    <Skeleton height={400} width={'00%'} />
                </>
            ) : (
                <>
                    <div className="mb-4">
                        <div className='flex justify-end gap-5'>
                            {
                                user.id === blog.authorId ? (
                                   <>
                                    <button
                                        type='button'
                                        className='px-6 h-8 bg-red-600 text-white rounded-lg hover:bg-gray-900'
                                        onClick={deleteblog} 
                                    >
                                        <IoTrashBinOutline/>
                                    </button>
                                    <button
                                        type='button'
                                        className='px-6 h-8 bg-green-500 text-white rounded-lg hover:bg-gray-900'
                                        onClick={() => navigate(`/update/${id}`)} 
                                    >
                                        <CiEdit/>
                                    </button>
                                   </>
                                    
                                ) : (
                                    <> </>
                                )
                            }
                        </div>
                
                        <p className="text-gray-600 mb-5">Author: {user?.name}</p>
                        <h1 className="text-2xl font-bold">{blog.title}</h1>
                        <p className="text-gray-800 mt-5 -mb-2">{blog.content}</p>
                    </div>
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

                </>
            )}
        </div>
    );
};

export default BLogCard;
