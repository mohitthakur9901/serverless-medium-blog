import { useState } from 'react';
import Labelinput from '../components/Labelinput';
import { CreatePostType } from 'mohit_mohit';

const CreateBlog = () => {
    const [postInputs, setPostinputs] = useState<CreatePostType>({
        title: '',
        content: ''
    });

    const handleCreate = () => {
       
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-32">
            <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
            <Labelinput
                type="text"
                label="Title"
                placeholder="Title"
                onChange={(e) => {
                    setPostinputs({ ...postInputs, title: e.target.value });
                }}
            />
            <Labelinput
                type="text"
                label="Content"
                placeholder="Content"
                onChange={(e) => {
                    setPostinputs({ ...postInputs, content: e.target.value });
                }}
            />
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
                onClick={handleCreate}
            >
                Create
            </button>
        </div>
    );
};

export default CreateBlog;
