import { useState } from 'react';
import Labelinput from '../components/Labelinput';
import { CreatePostType } from 'mohit_mohit';
import { BACKEND_URL } from '../config';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreateBlog = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const [postInputs, setPostinputs] = useState<CreatePostType>({
        title: '',
        content: '',
    });
    const { token } = useSelector((state: any) => state.user);

    const handleCreate = async () => {
        if (postInputs.title === "" || postInputs.content === "") {
            toast.error('Please fill in all the fields');
            return;
        }
        try {
            setLoading(true);

            const response = await BACKEND_URL.post('/blog', postInputs, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            // console.log(response);

            if (response.status === 200) {
                setLoading(false);
                toast.success('Blog post created successfully');
                navigate('/')
                // You can redirect the user to the created blog post or any other page
            } else {
                toast.error('Failed to create blog post');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error creating blog post:', error);
            toast.error('Failed to create blog post');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-32 items-center shadow-md">
            <h1 className="text-2xl font-bold mb-4 ">Create a New Blog Post</h1>
            <Labelinput
                type="text"
                label="Title"
                placeholder="Title"
                className='border-2 border-black rounded-md p-2 mb-5'
                onChange={(e) => {
                    setPostinputs({ ...postInputs, title: e.target.value });
                }}
            />
            <Labelinput
                type="text"
                label="Content"
                placeholder="Content"
                className='border-2 border-black rounded-md p-2 mb-5'
                onChange={(e) => {
                    setPostinputs({ ...postInputs, content: e.target.value });
                }}
            />
           <div className="flex justify-end gap-5">
        <button
          type="button"
          className={`rounded-3xl bg-black text-white items-end mt-5 sm:px-5 p-3 hover:bg-gray-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? <h1 className="animate-spin"><AiOutlineLoading3Quarters /></h1> : 'Create'}
        </button>
        <button
          type="button"
          className={`rounded-3xl bg-black text-white items-end mt-5 sm:px-5 p-3 hover:bg-gray-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          onClick={() => navigate(`/`)}
          disabled={loading}
        >
          {loading ? <h1 className="animate-spin"><AiOutlineLoading3Quarters /></h1> : 'Go Back'}
        </button>
      </div>
        </div>
    );
};

export default CreateBlog;
