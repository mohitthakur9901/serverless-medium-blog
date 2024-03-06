
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
export default function PrivateRoute(){
    const { user } = useSelector((state: any) => state.user);
    console.log(user.id)

    return user.id ? <Outlet /> : <Navigate to='/signin' />
}

