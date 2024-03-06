import React, { useEffect, useState } from 'react'
import Labelinput from '../components/Labelinput';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../config';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdatePostType } from 'mohit_mohit';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const UpdateBlog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const [postInputs, setPostinputs] = useState<UpdatePostType>({
      title: '',
      content: '',
  });
  const { token } = useSelector((state: any) => state.user);
  const { blog } = useSelector((state: any) => state.blog);

  useEffect(() => {
    if (blog) {
      setPostinputs({
        title: blog.title,
        content: blog.content,
      });
    }
  }, [blog])


  const {id} = useParams()

  

  const updateblog = async () => {
    try {
      setLoading(true)
        const res = await BACKEND_URL.put(`/blog/${id}`, postInputs, {
            headers: {
                Authorization: `${token}`,
            },
        });
        if (res.status === 200) {
          setLoading(false)
            toast.success('Blog updated successfully');
            navigate('/');
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
        console.error('Error updating blog:', error);
        toast.error('Failed to update blog');
    }
};

  return (
    <div className="max-w-md mx-auto p-4 mt-32 items-center">
    <h1 className="text-2xl font-bold mb-4 ">Update Your Blog</h1>
    <Labelinput
        type="text"
        label="Title"
        value={postInputs.title}
        placeholder="Title"
        className='border-2 border-black rounded-md p-2 mb-5'
        onChange={(e) => {
            setPostinputs({ ...postInputs, title: e.target.value });
        }}
    />
    <Labelinput
        type="text"
        label="Content"
        value={postInputs.content}
        placeholder="Content"
        className='border-2 border-black rounded-md p-2 mb-5'
        onChange={(e) => {
            setPostinputs({ ...postInputs, content: e.target.value });
        }}
    />
    <button
        type="button"
        className={`rounded-3xl bg-black text-white items-end mt-5 sm:px-5 p-3 hover:bg-gray-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        onClick={updateblog}
        disabled={loading}
    >
        {loading ? <h1 className="animate-spin"><AiOutlineLoading3Quarters/></h1>: 'Update'}
    </button>
</div>
  )
}

export default UpdateBlog