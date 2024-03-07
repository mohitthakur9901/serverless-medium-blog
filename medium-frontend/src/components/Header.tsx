import { useState } from 'react';
import { FaMedium, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../store/AuthUser/User';
import toast from 'react-hot-toast';

const Header = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged Out Successfully');
    dispatch(removeUser());
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 flex justify-around p-3 border-b-2 border-black gap-10 bg-white'>
      <h1 className='text-5xl flex items-center gap-2'>
        <FaMedium />
        <Link to="/">
          <h1 className='text-4xl font-semibold'>Medium</h1>
        </Link>
      </h1>
      <div className='flex justify-between gap-5 items-center relative'>
        {user.id && (
          <Link to='/create/blog'>
            <h1 className='rounded-3xl bg-black text-white items-end p-1 sm:px-5 px-3 hover:bg-gray-700'>Write</h1>
          </Link>
        )}

        {user.id ? (
          <>
            <div className='relative inline-block text-left'>
              <div>
                <button
                  type='button'
                  className='text-4xl cursor-pointer '
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <FaUserCircle />
                </button>
              </div>
              {showUserDropdown && (
                <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <p className='block px-4 py-2 text-lg text-gray-700'>{user.name}</p>
                    <p className='block px-4 py-2 text-sm text-gray-700'>{user.email}</p>
                    <button
                      type='button' 
                      className='rounded-3xl bg-black text-white  p-1 sm:px-5 px-3 hover:bg-gray-700 w-full mb-2'
                      onClick={() => navigate('/my-blogs')}
                    >
                      my blogs
                    </button>

                    <button
                      type='button'
                      className='rounded-3xl bg-black text-white  p-1 sm:px-5 px-3 hover:bg-gray-700 w-full  '
                      onClick={handleLogout}
                    >
                      LogOut
                    </button>


                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to='/signin'>
              <h1 className='hover:underline'>Sign In</h1>
            </Link>
            <Link to='/signup' className='rounded-3xl bg-black text-white sm:p-1 p-0 sm:px-5 px-2 hover:bg-gray-700 text-sm sm:text-ls'>
              Get Started
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
